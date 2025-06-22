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

    // CO2 counter animation
    const co2Interval = setInterval(() => {
      setCo2Saved(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);

    // Testimonial carousel
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
      <section className="relative flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80')" }}
        ></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Measure Your <span className="text-green-300">Carbon Footprint</span>, <br />Reduce Your Impact
          </h1>
          <p 
            className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto"
            data-aos="fade-down"
            data-aos-delay="300"
          >
            Join thousands of environmentally conscious individuals tracking and reducing their carbon emissions with our scientifically validated calculator.
          </p>
          <div data-aos="fade-up" data-aos-delay="500">
            <a 
              href="/Carbon-Calculator/#/calculator" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Calculate Your Footprint Now
            </a>
          </div>
        </div>

        <div 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <a href="#why-it-matters" className="text-white animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section id="why-it-matters" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              data-aos="fade-down"
            >
              Why Carbon Awareness Matters
            </h2>
            <div 
              className="w-20 h-1 bg-green-500 mx-auto mb-8"
              data-aos="fade-down"
              data-aos-delay="100"
            ></div>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              The average person generates <span className="font-semibold">4.8 metric tons</span> of CO₂ annually. Small changes in daily habits can significantly reduce this impact when adopted collectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-500"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-green-500 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CO2 Counter Section */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white text-center">
        <div 
          className="max-w-4xl mx-auto px-6"
          data-aos="fade-up"
        >
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

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              data-aos="fade-down"
            >
              Simple Three-Step Process
            </h2>
            <div 
              className="w-20 h-1 bg-green-500 mx-auto mb-8"
              data-aos="fade-down"
              data-aos-delay="100"
            ></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "01",
                title: "Calculate Your Footprint", 
                description: "Enter details about your energy use, transportation, diet, and lifestyle habits.",
                icon: "📊"
              },
              { 
                step: "02",
                title: "Understand Your Impact", 
                description: "Receive a detailed breakdown of your carbon emissions by category.",
                icon: "🔍"
              },
              { 
                step: "03",
                title: "Take Action", 
                description: "Get personalized recommendations to reduce your environmental impact.",
                icon: "🌱"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-t-4 border-green-500 pt-12"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="absolute -top-6 left-6 bg-green-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center">
                  {item.step}
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eco Actions Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              data-aos="fade-down"
            >
              Simple Actions, Significant Impact
            </h2>
            <div 
              className="w-20 h-1 bg-green-500 mx-auto mb-8"
              data-aos="fade-down"
              data-aos-delay="100"
            ></div>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Small changes in daily routines can collectively make a tremendous difference to our planet.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {ecoActions.map((action, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition duration-300"
                data-aos="flip-up"
                data-aos-delay={index * 100}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h4 className="font-semibold mb-2">{action.action}</h4>
                <p className="text-sm text-green-600">{action.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
              data-aos="fade-down"
            >
              What Our Users Say
            </h2>
            <div 
              className="w-20 h-1 bg-green-500 mx-auto mb-8"
              data-aos="fade-down"
              data-aos-delay="100"
            ></div>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            data-aos="fade-down"
          >
            Ready to Reduce Your Carbon Footprint?
          </h2>
          <p 
            className="text-xl mb-10 max-w-2xl mx-auto opacity-90"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Join our community of environmentally conscious individuals making a difference every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up">
            <a 
              href="/Carbon-Calculator/#/calculator" 
              className="bg-white text-green-700 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300"
            >
              Calculate Your Footprint
            </a>
            <a 
              href="/learn" 
              className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}