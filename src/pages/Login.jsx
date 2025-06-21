import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Signup

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="flex items-center justify-center pt-32 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          <form className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block mb-1 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Your Name"
                />
              </div>
            )}

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 font-medium hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
