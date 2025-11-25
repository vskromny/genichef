import React from 'react';
import { Camera, Utensils, Filter, Brain, Apple, Clock, Phone } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-4">
        <Icon className="w-6 h-6 text-primary-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Cook Smarter with
              <span className="text-primary-600"> ReciPics</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Turn your ingredients into delicious meals instantly with AI-powered recipe suggestions.
            </p>
            <button className="bg-primary-500 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors">
              Join Waitlist
            </button>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800"
              alt="Cooking ingredients"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How ReciPics Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Camera className="w-12 h-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Snap a Photo</h3>
              <p className="text-gray-600">Take a picture of your available ingredients</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Brain className="w-12 h-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Magic</h3>
              <p className="text-gray-600">Our AI analyzes and suggests perfect recipes</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Utensils className="w-12 h-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Cooking</h3>
              <p className="text-gray-600">Follow easy step-by-step instructions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Smart Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Filter}
              title="Smart Filters"
              description="Filter recipes by meal type, dietary restrictions, and fitness goals"
            />
            <FeatureCard
              icon={Apple}
              title="Nutritional Insights"
              description="Get detailed nutritional information for every recipe"
            />
            <FeatureCard
              icon={Clock}
              title="Time Saver"
              description="Quick recipes based on your available time and ingredients"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Join our waitlist to be the first to know when ReciPics launches.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <button className="bg-gray-900 text-primary-200 px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Phone className="w-8 h-8 text-primary-200 mr-2" />
              <span className="text-2xl font-bold">ReciPics</span>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-primary-200 transition-colors">About</a>
              <a href="#" className="hover:text-primary-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary-200 transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-200 transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center mt-8 text-gray-400">
            © {new Date().getFullYear()} ReciPics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
