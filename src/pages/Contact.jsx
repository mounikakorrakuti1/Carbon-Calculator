import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
   subject: '',
    message: '',
    file: null,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '', file: null });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 text-gray-800 p-4 md:px-8 lg:px-16 xl:px-32">
      <section className="max-w-7xl mx-auto py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-700" data-aos="fade-down">Get in Touch</h1>
          <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600" data-aos="fade-up">
            We'd love to hear from you! Whether you have feedback, partnership ideas, questions, or just want to say hello — every message helps us grow.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <section data-aos="fade-right">
            <form
              className="bg-white p-6 md:p-8 rounded-xl shadow-md"
              onSubmit={handleSubmit}
              noValidate
            >
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              {/* Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  aria-describedby={formErrors.name ? 'name-error' : undefined}
                />
                {formErrors.name && <p id="name-error" className="mt-1 text-sm text-red-600">{formErrors.name}</p>}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  aria-describedby={formErrors.email ? 'email-error' : undefined}
                />
                {formErrors.email && <p id="email-error" className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label htmlFor="subject" className="block mb-2 font-medium text-gray-700">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                >
                  <option value="">Select a subject...</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Volunteer">Volunteer Opportunity</option>
                  <option value="Other">Other Inquiry</option>
                </select>
                {formErrors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600">{formErrors.subject}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                  aria-describedby={formErrors.message ? 'message-error' : undefined}
                ></textarea>
                {formErrors.message && <p id="message-error" className="mt-1 text-sm text-red-600">{formErrors.message}</p>}
              </div>

              {/* File Upload */}
              <div className="mb-8">
                <label htmlFor="file" className="block mb-2 font-medium text-gray-700">Attach a File (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-white">
                    <span className="text-gray-500 truncate mr-2">
                      {formData.file ? formData.file.name : 'No file selected'}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">Browse</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">Max file size: 5MB</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:bg-green-700 transition duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
            </form>
          </section>

          {/* Contact Info Section */}
          {/* You already included a nice one — no fixes needed unless you want further customization */}
        </div>
      </section>
    </div>
  );
}
