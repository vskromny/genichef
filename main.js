// Initialize Lucide icons
lucide.createIcons();

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Add smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Email validation for the signup form
const emailForm = document.querySelector('.email-signup');
const emailInput = emailForm.querySelector('input[type="email"]');
const submitButton = emailForm.querySelector('button');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  
  if (!email) {
    alert('Please enter your email address');
    return;
  }
  
  if (!isValidEmail(email)) {
    alert('Please enter a valid email address');
    return;
  }
  
  // Here you would typically send the email to your server
  alert('Thank you for joining our waitlist! We\'ll notify you when GeniChef launches.');
  emailInput.value = '';
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add intersection observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(section);
});

// Add visible class for animation
document.styleSheets[0].insertRule(`
  section.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`, 0);