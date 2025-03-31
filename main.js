// Initialize Lucide icons
lucide.createIcons();

// Initialize AOS (Animate on Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-out',
  once: false,
  mirror: false,
  offset: 120
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Parallax effect for hero image
document.addEventListener('DOMContentLoaded', function() {
  const parallaxImage = document.querySelector('.parallax-img');
  if (parallaxImage) {
    new simpleParallax(parallaxImage, {
      scale: 1.1,
      delay: .6,
      transition: 'cubic-bezier(0,0,0,1)'
    });
  }
});

// Sticky header
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '0.5rem 0';
    navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.padding = '1rem 0';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
});

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    
    // Update the icon (menu ↔ x)
    const menuIcon = mobileMenuBtn.querySelector('i');
    if (menuIcon) {
      if (navLinks.classList.contains('show')) {
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    }
  });
}

// Tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Hide all tab contents
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show the selected tab content
    const tabId = button.getAttribute('data-tab');
    document.getElementById(tabId).classList.add('active');
  });
});

// Testimonial Carousel
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (testimonialTrack && testimonialCards.length) {
  let currentIndex = 0;
  const maxIndex = testimonialCards.length - 1;
  
  // Update active dot
  const updateDots = (index) => {
    if (dots && dots.length) {
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  };
  
  // Scroll to a specific slide
  const scrollToSlide = (index) => {
    if (index < 0) index = 0;
    if (index > maxIndex) index = maxIndex;
    
    currentIndex = index;
    const cardWidth = testimonialCards[0].offsetWidth + 32; // width + gap
    testimonialTrack.scrollLeft = cardWidth * currentIndex;
    
    updateDots(currentIndex);
  };
  
  // Next and previous buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollToSlide(currentIndex + 1);
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollToSlide(currentIndex - 1);
    });
  }
  
  // Click on dots
  if (dots && dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        scrollToSlide(index);
      });
    });
  }
  
  // Auto-advance the carousel
  setInterval(() => {
    if (currentIndex >= maxIndex) {
      scrollToSlide(0);
    } else {
      scrollToSlide(currentIndex + 1);
    }
  }, 5000);
}

// Email validation for the signup form
const emailForm = document.querySelector('.email-signup');
const emailInput = emailForm.querySelector('input[type="email"]');
const submitButton = emailForm.querySelector('button');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  
  if (!email) {
    showNotification('Please enter your email address', 'error');
    return;
  }
  
  if (!isValidEmail(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Here you would typically send the email to your server
  showNotification('Thank you for joining our waitlist! We\'ll notify you when GeniChef launches.', 'success');
  emailInput.value = '';
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Custom notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  // Add icon based on type
  let icon = 'info';
  if (type === 'success') icon = 'check-circle';
  if (type === 'error') icon = 'alert-circle';
  
  notification.innerHTML = `
    <i data-lucide="${icon}"></i>
    <span>${message}</span>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Initialize the icon
  lucide.createIcons({
    attrs: {
      class: 'notification-icon'
    }
  });
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Launch countdown timer
const countdownElements = document.querySelectorAll('.counter-number');
if (countdownElements.length) {
  // Set the launch date (today + 28 days)
  const now = new Date();
  const launchDate = new Date();
  launchDate.setDate(now.getDate() + 28);
  launchDate.setHours(now.getHours() + 14);
  launchDate.setMinutes(now.getMinutes() + 53);
  launchDate.setSeconds(now.getSeconds() + 9);
  
  function updateCountdown() {
    const currentTime = new Date();
    const difference = launchDate - currentTime;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    countdownElements[0].textContent = days.toString().padStart(2, '0');
    countdownElements[1].textContent = hours.toString().padStart(2, '0');
    countdownElements[2].textContent = minutes.toString().padStart(2, '0');
    countdownElements[3].textContent = seconds.toString().padStart(2, '0');
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Intersection Observer for animated elements not using AOS
const observerOptions = {
  rootMargin: '0px',
  threshold: 0.1
};

// Observer for adding custom animations to elements
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Apply animations based on data attributes
      if (entry.target.dataset.animation) {
        entry.target.classList.add(entry.target.dataset.animation);
      }
    }
  });
}, observerOptions);

// Observe elements with data-animation attribute
document.querySelectorAll('[data-animation]').forEach(element => {
  animationObserver.observe(element);
});

// Add CSS variable for scroll position (for parallax effects)
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollPercentage = (scrollPos / maxScroll) * 100;
  
  document.documentElement.style.setProperty('--scroll', scrollPos + 'px');
  document.documentElement.style.setProperty('--scroll-percent', scrollPercentage + '%');
});

// Add custom cursor effects on interactive elements for desktop
if (window.matchMedia('(min-width: 1024px)').matches) {
  const cursorElements = document.querySelectorAll('button, .btn-primary, .btn-secondary, .nav-link, .tab-btn');
  
  cursorElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.classList.add('interactive-cursor');
    });
    
    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('interactive-cursor');
    });
  });
}

// Add these styles for the notification and cursor effects
const style = document.createElement('style');
style.textContent = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 15px 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }
  
  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .notification.success {
    border-left: 4px solid #10b981;
  }
  
  .notification.error {
    border-left: 4px solid #ef4444;
  }
  
  .notification.info {
    border-left: 4px solid #3b82f6;
  }
  
  .notification i {
    color: #6b7280;
  }
  
  .notification.success i {
    color: #10b981;
  }
  
  .notification.error i {
    color: #ef4444;
  }
  
  .notification.info i {
    color: #3b82f6;
  }
  
  .interactive-cursor {
    cursor: pointer;
  }
  
  .nav-links.show {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    padding: 20px;
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
    z-index: 100;
    border-radius: 0 0 15px 15px;
    animation: slideDown 0.3s ease-out forwards;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);