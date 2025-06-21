import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  const [co2Saved, setCo2Saved] = useState(8542);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out-quad'
    });

    const co2Interval = setInterval(() => {
      setCo2Saved(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);

    const testimonialInterval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(co2Interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Precise Calculation",
      description: "Get accurate carbon footprint measurements using scientifically validated algorithms."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Actionable Insights",
      description: "Receive personalized recommendations to reduce your environmental impact."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Verified Impact",
      description: "Track your progress with verified carbon reduction metrics."
    }
  ];

  const testimonials = [
    {
      quote: "This tool transformed how I understand my environmental impact. The personalized recommendations helped me reduce my carbon footprint by 30% in just three months.",
      name: "Priya Sharma",
      role: "Sustainability Consultant, Bangalore",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "As a business owner, the carbon calculator helped us identify key areas for improvement in our operations, leading to both cost savings and environmental benefits.",
      name: "Rahul Kapoor",
      role: "Small Business Owner, Mumbai",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "The educational resources combined with the calculator make this the most comprehensive sustainability tool I've used. My whole family is now engaged in reducing our impact.",
      name: "Ananya Reddy",
      role: "Environmental Educator, Hyderabad",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  const impactStats = [
    { value: "150K+", label: "Carbon calculations performed" },
    { value: "87%", label: "Users adopted greener habits" },
    { value: "120+", label: "Countries reached" },
    { value: "2.5M kg", label: "CO₂ saved collectively" }
  ];

  const ecoActions = [
    { icon: "🚲", action: "Bike to work 2x/week", impact: "Saves ~200kg CO₂/year" },
    { icon: "🌿", action: "Meat-free Mondays", impact: "Saves ~300kg CO₂/year" },
    { icon: "💡", action: "Switch to LED bulbs", impact: "Saves ~40kg CO₂/bulb/year" },
    { icon: "🚰", action: "Reduce shower time", impact: "Saves ~500L water/month" },
    { icon: "🛒", action: "Use reusable bags", impact: "Eliminates plastic waste" }
  ];

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      {/* ... your Hero, Why it Matters, Features, Stats, etc. sections stay the same ... */}

      {/* CO2 Counter Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6" data-aos="fade-up">
          <h3 className="text-2xl font-semibold mb-4">Collective Impact of Our Community</h3>
          <div className="text-5xl md:text-6xl font-extrabold mb-6">{co2Saved.toLocaleString()} kg</div>
          <p className="text-xl mb-8">CO₂ emissions saved through sustainable actions</p>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
            <div 
              className="bg-yellow-300 h-2 rounded-full" 
              style={{ width: `${(co2Saved % 10000) / 100}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800" data-aos="fade-down">
              What Our Users Say
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto mb-8" data-aos="fade-down" data-aos-delay="100"></div>
          </div>

          <div className="relative h-64">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${index === activeTestimonial ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                data-aos="fade"
              >
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="flex items-start mb-6">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover mr-6"
                    />
                    <div>
                      <p className="text-lg italic mb-4 text-gray-700">"{testimonial.quote}"</p>
                      <div>
                        <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${index === activeTestimonial ? 'bg-green-500' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* ...continue with CTA Section... */}
    </div>
  );
}
