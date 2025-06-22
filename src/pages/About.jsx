import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out-quad'
    });
  }, []);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1605165566807-508fb529cf3e?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.1.0&auto=format&fit=crop&w=1200&q=80'
  ];

  const quizQuestions = [
    { 
      question: 'Reducing your shower by 5 minutes can save up to 50 liters of water.', 
      answer: 'True',
      explanation: 'A standard shower uses about 10 liters per minute. Reducing by 5 minutes saves approximately 50 liters.'
    },
    { 
      question: 'Eating more plant-based meals helps lower your carbon footprint.', 
      answer: 'True',
      explanation: 'Animal agriculture accounts for 14.5% of global greenhouse gas emissions (FAO). Plant-based diets have significantly lower carbon footprints.'
    },
    { 
      question: 'Driving a car emits less CO₂ than taking public transport.', 
      answer: 'False',
      explanation: 'Public transport emits about 50-80% less CO₂ per passenger mile compared to single-occupancy vehicles.'
    },
    { 
      question: 'LED bulbs consume more energy than incandescent bulbs.', 
      answer: 'False',
      explanation: 'LEDs use 75% less energy and last 25 times longer than incandescent lighting (Energy.gov).'
    },
    { 
      question: 'Air travel is one of the highest sources of personal carbon emissions.', 
      answer: 'True',
      explanation: 'One round-trip flight from NY to London emits about 1 ton of CO₂ per passenger - equal to 1 month of driving.'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate background images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (selected) => {
    if (selected === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
    
    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
  };

  const frameworks = [
    {
      title: "IPCC Reports",
      description: "The gold standard for climate science research and emissions data",
      link: "https://www.ipcc.ch/reports/",
      icon: "📊"
    },
    {
      title: "EPA Carbon Calculator",
      description: "US Environmental Protection Agency's emissions calculation methodology",
      link: "https://www.epa.gov/carbon-footprint-calculator",
      icon: "🇺🇸"
    },
    {
      title: "India CEA Reports",
      description: "Official electricity generation and emissions data for India",
      link: "https://cea.nic.in/reports/",
      icon: "🇮🇳"
    },
    {
      title: "Paris Agreement",
      description: "International treaty on climate change mitigation",
      link: "https://unfccc.int/process-and-meetings/the-paris-agreement/the-paris-agreement",
      icon: "🌍"
    },
    {
      title: "Project Drawdown",
      description: "Comprehensive plan to reverse global warming",
      link: "https://drawdown.org/solutions",
      icon: "📉"
    },
    {
      title: "UN SDGs",
      description: "17 Sustainable Development Goals including Climate Action",
      link: "https://sdgs.un.org/goals",
      icon: "⚖️"
    }
  ];

  const impactStats = [
    { value: "25%", label: "of global emissions come from household activities" },
    { value: "40kg", label: "CO₂ saved annually per LED bulb replacement" },
    { value: "300-500kg", label: "CO₂ saved yearly by meat-free days (1x week)" },
    { value: "80%", label: "reduction in transport emissions using public transit" }
  ];

  return (
    <div className="min-h-screen text-gray-800 overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 transition-opacity duration-1000 ease-in-out">
        <img 
          src={backgroundImages[currentImageIndex]} 
          alt="Climate background" 
          className="object-cover w-full h-full brightness-50"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 text-center bg-black bg-opacity-60">
          <div className="max-w-6xl mx-auto">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-8 text-white" 
              data-aos="fade-down"
              data-aos-delay="100"
            >
              Understanding Your <span className="text-green-400">Carbon Footprint</span>
            </h1>
            <div 
              className="w-24 h-1 bg-green-400 mx-auto mb-12" 
              data-aos="fade-down"
              data-aos-delay="300"
            ></div>
            <p 
              className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed" 
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Climate change is the defining challenge of our generation. Household activities account for <span className="font-semibold text-green-300">20-25% of global CO₂ emissions</span> through energy use, transportation, food choices, and waste. Our calculator translates your daily habits into carbon emissions using scientifically validated data from leading climate organizations.
            </p>
            <div data-aos="fade-up" data-aos-delay="700">
              <a 
                href="#calculator" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
              >
                Learn How You Can Make a Difference
              </a>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section id="calculator" className="py-20 px-6 bg-white bg-opacity-95">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
              data-aos="zoom-in"
            >
              Scientifically Validated Carbon Calculation
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {frameworks.map((framework, index) => (
                <a
                  key={index}
                  href={framework.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 border-l-4 border-green-500 transform hover:-translate-y-2"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-4xl mb-4">{framework.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-green-700">{framework.title}</h3>
                  <p className="text-gray-600">{framework.description}</p>
                  <div className="mt-4 text-green-600 font-medium flex items-center">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 px-6 bg-green-50 bg-opacity-90">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
              data-aos="fade-up"
            >
              The Power of Individual Action
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <div className="grid grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm text-center"
                      data-aos="zoom-in"
                      data-aos-delay={index * 200}
                    >
                      <div className="text-3xl font-bold text-green-600 mb-2">{stat.value}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div data-aos="fade-left">
                <blockquote className="border-l-4 border-green-500 pl-6 py-4 mb-8">
                  <p className="text-xl italic text-gray-700 mb-4">
                    "We don't have to engage in grand, heroic actions to participate in change. Small acts, when multiplied by millions of people, can transform the world."
                  </p>
                  <footer className="font-semibold text-green-700">— Howard Zinn</footer>
                </blockquote>
                
                <p className="text-lg text-gray-700 mb-6">
                  While systemic change is essential, individual actions create the cultural shift needed for larger transformations. Our calculator shows exactly how your choices add up.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Energy Efficiency</span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Sustainable Diet</span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Green Transportation</span>
                  <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">Waste Reduction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDGs Section */}
        <section className="py-20 px-6 bg-white bg-opacity-95">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
              data-aos="fade-down"
            >
              Supporting the UN Sustainable Development Goals
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div 
                className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-8 rounded-xl shadow-md border border-yellow-200"
                data-aos="fade-up"
              >
                <div className="text-4xl mb-4">🌞</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">SDG 7: Affordable & Clean Energy</h3>
                <p className="text-gray-600">
                  By calculating and optimizing your home energy use, you contribute to the global transition to sustainable energy systems.
                </p>
              </div>
              
              <div 
                className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl shadow-md border border-green-200"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">SDG 12: Responsible Consumption</h3>
                <p className="text-gray-600">
                  Understanding your footprint is the first step toward more sustainable consumption and production patterns.
                </p>
              </div>
              
              <div 
                className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 rounded-xl shadow-md border border-blue-200"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">SDG 13: Climate Action</h3>
                <p className="text-gray-600">
                  Personal carbon literacy and action are essential components of global climate change mitigation efforts.
                </p>
              </div>
            </div>
            
            <div className="text-center" data-aos="fade-up">
              <a 
                href="https://sdgs.un.org/goals" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition"
              >
                Explore All 17 Sustainable Development Goals
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Interactive Quiz */}
        <section className="py-20 px-6 bg-green-50 bg-opacity-90">
          <div className="max-w-2xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              data-aos="fade-down"
            >
              Climate Knowledge Challenge
            </h2>
            
            <div 
              className="bg-white p-8 md:p-10 rounded-xl shadow-lg"
              data-aos="zoom-in"
            >
              {!quizCompleted ? (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-600">Question {currentQuestion + 1} of {quizQuestions.length}</span>
                      <span className="text-sm font-medium text-gray-500">Score: {score}/{currentQuestion}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center text-gray-800">
                    {quizQuestions[currentQuestion].question}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button 
                      onClick={() => handleAnswer('True')} 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
                    >
                      True
                    </button>
                    <button 
                      onClick={() => handleAnswer('False')} 
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg shadow transition duration-300"
                    >
                      False
                    </button>
                  </div>
                  
                  {showExplanation && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 animate-fadeIn">
                      <p className="font-medium">Did you know?</p>
                      <p>{quizQuestions[currentQuestion].explanation}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-6">
                    {score >= quizQuestions.length - 1 ? "🏆" : score >= quizQuestions.length / 2 ? "🌱" : "📚"}
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-4">
                    You scored {score} out of {quizQuestions.length}!
                  </h3>
                  <p className="text-lg mb-8">
                    {score >= quizQuestions.length - 1 
                      ? "Climate champion! Your knowledge is impressive!" 
                      : score >= quizQuestions.length / 2 
                        ? "Good start! Keep learning about sustainability!" 
                        : "Every expert was once a beginner. Keep learning!"}
                  </p>
                  <button 
                    onClick={resetQuiz} 
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition duration-300"
                  >
                    Take Quiz Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-white bg-opacity-95">
          <div className="max-w-4xl mx-auto">
            <h2 
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
              data-aos="fade-down"
            >
              Our Green Initiative Team
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div data-aos="fade-right">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Project Greenverse</h3>
                <p className="text-gray-600 mb-6">
                  Developed as part of the AICTE 1M1B Green Internship Initiative - National Climate Action Program, our team from SRKR Engineering College created this carbon footprint calculator to empower individuals with knowledge about their environmental impact.
                </p>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-2 text-green-800">Scientific Validation</h4>
                  <p className="text-gray-600 text-sm">
                    Our calculations use emission factors from IPCC, EPA, and India's Central Electricity Authority, ensuring scientifically accurate results.
                  </p>
                </div>
              </div>
              
              <div data-aos="fade-left">
                <h3 className="text-xl font-semibold mb-4 text-green-700">Team Members</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Sanjana Narni
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Mounika Korrakuti
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Hemanth Bolla
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Guna Satya Murari
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-2 text-green-800">Special Thanks</h4>
                  <p className="text-gray-600 text-sm">
                    Our faculty mentors, the AICTE 1M1B program coordinators, and the global climate science community for their guidance and support.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center" data-aos="fade-up">
              <a 
                href="#/contact" 
                className="inline-flex items-center text-green-600 font-semibold hover:text-green-800 transition px-6 py-3 border border-green-300 rounded-lg hover:bg-green-50"
              >
                Contact Our Team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}