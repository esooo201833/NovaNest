import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-primary flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Title - Above the card */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-display">
            {t('contact.title') || 'Get In Touch'}
          </h1>
          <p className="text-lg text-light/70">
            We&apos;d love to hear from you
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div 
          className="bg-secondary/15 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-secondary/30 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative">
              <label className="block text-light/80 text-sm mb-2 font-medium">
                {t('contact.name') || 'Your Name'}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-secondary/10 backdrop-blur-sm border-2 border-secondary/30 rounded-xl text-secondary placeholder-light/40 focus:outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <label className="block text-light/80 text-sm mb-2 font-medium">
                {t('contact.email') || 'Your Email'}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-secondary/10 backdrop-blur-sm border-2 border-secondary/30 rounded-xl text-secondary placeholder-light/40 focus:outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20 transition-all duration-300"
                required
              />
            </div>

            {/* Message Field */}
            <div className="relative">
              <label className="block text-light/80 text-sm mb-2 font-medium">
                {t('contact.message') || 'Your Message'}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message here..."
                rows={5}
                className="w-full px-4 py-3 bg-secondary/10 backdrop-blur-sm border-2 border-secondary/30 rounded-xl text-secondary placeholder-light/40 focus:outline-none focus:border-secondary/60 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full px-6 py-4 bg-secondary text-primary rounded-xl font-semibold text-lg border border-secondary/50 hover:bg-secondary/90 transition-all duration-300 shadow-lg shadow-secondary/20"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('contact.submit') || 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div 
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { icon: '📧', label: 'Email', value: 'novanestcontactus@gmail.com' },
            { icon: '📱', label: 'Phone', value: '+20 1110182114' },
            { icon: '📍', label: 'Location', value: 'Giza, Egypt' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-secondary/10 backdrop-blur-sm rounded-xl p-4 text-center border border-secondary/20 shadow-md cursor-pointer hover:bg-secondary/20 transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-light/60 text-xs uppercase tracking-wide mb-1">{item.label}</p>
              <p className="text-secondary font-medium text-sm break-words overflow-hidden">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
