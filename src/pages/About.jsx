import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar'; // ✅ Navbar imported

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out-quad',
    });
  }, []);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1605165566807-508fb529cf3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80'
  ];

  const quizQuestions = [
    {
      question: 'Reducing your shower by 5 minutes can save up to 50 liters of water.',
      answer: 'True',
      explanation: 'A standard shower uses about 10 liters per minute. Reducing by 5 minutes saves approximately 50 liters.',
    },
    {
      question: 'Eating more plant-based meals helps lower your carbon footprint.',
      answer: 'True',
      explanation: 'Animal agriculture accounts for 14.5% of global greenhouse gas emissions (FAO). Plant-based diets have significantly lower carbon footprints.',
    },
    {
      question: 'Driving a car emits less CO₂ than taking public transport.',
      answer: 'False',
      explanation: 'Public transport emits about 50-80% less CO₂ per passenger mile compared to single-occupancy vehicles.',
    },
    {
      question: 'LED bulbs consume more energy than incandescent bulbs.',
      answer: 'False',
      explanation: 'LEDs use 75% less energy and last 25 times longer than incandescent lighting (Energy.gov).',
    },
    {
      question: 'Air travel is one of the highest sources of personal carbon emissions.',
      answer: 'True',
      explanation: 'One round-trip flight from NY to London emits about 1 ton of CO₂ per passenger - equal to 1 month of driving.',
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <div className="relative min-h-screen text-gray-800 overflow-hidden">
      {/* ✅ Navbar made visible */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* ✅ Background Image Layer */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <img
          src={backgroundImages[currentImageIndex]}
          alt="Background"
          className="object-cover w-full h-full brightness-50"
        />
      </div>

      {/* ✅ Foreground content */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-95 p-8 sm:p-10 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-700">
            Climate Knowledge Challenge
          </h2>

          {!quizCompleted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                  <span>Score: {score}/{currentQuestion > 0 ? currentQuestion : 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-6 text-center">
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                <button
                  onClick={() => handleAnswer('True')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                >
                  True
                </button>
                <button
                  onClick={() => handleAnswer('False')}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  False
                </button>
              </div>

              {showExplanation && (
                <div className="bg-blue-50 border border-blue-300 text-blue-800 p-4 rounded-lg text-sm">
                  <strong>Did you know?</strong>
                  <p>{quizQuestions[currentQuestion].explanation}</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="text-5xl mb-4">
                {score >= quizQuestions.length - 1
                  ? "🏆"
                  : score >= quizQuestions.length / 2
                    ? "🌱"
                    : "📚"}
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                You scored {score} out of {quizQuestions.length}!
              </h3>
              <p className="text-gray-700 mb-6">
                {score >= quizQuestions.length - 1
                  ? "Climate champion! Your knowledge is impressive!"
                  : score >= quizQuestions.length / 2
                    ? "Good start! Keep learning about sustainability!"
                    : "Every expert was once a beginner. Keep learning!"}
              </p>
              <button
                onClick={resetQuiz}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
