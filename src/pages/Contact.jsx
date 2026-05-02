import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';

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

  const [submitted, setSubmitted] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    // EmailJS configuration
    const SERVICE_ID = 'service_o3x98xo';
    const TEMPLATE_ID = 'template_e8701wa';
    const USER_ID = 'F_i3XVkHrbY02r6PC';
    
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_email: 'novanestcontactus@gmail.com'
    };
    
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        setSubmitted(true);
        setIsSending(false);
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        setIsSending(false);
        alert('Sorry, there was an error sending your message. Please try again.');
      });
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
              disabled={submitted || isSending}
              className={`w-full px-6 py-4 rounded-xl font-semibold text-lg border border-secondary/50 transition-all duration-300 shadow-lg ${
                submitted 
                  ? 'bg-green-600 text-white cursor-default' 
                  : isSending
                    ? 'bg-secondary/50 text-primary cursor-wait'
                    : 'bg-secondary text-primary hover:bg-secondary/90 hover:scale-[1.02] hover:-translate-y-0.5'
              }`}
              whileHover={submitted || isSending ? {} : { scale: 1.02, y: -2 }}
              whileTap={submitted || isSending ? {} : { scale: 0.98 }}
            >
              {isSending 
                ? '⏳ Sending...' 
                : submitted 
                  ? '✅ Message Sent Successfully!' 
                  : (t('contact.submit') || 'Send Message')}
            </motion.button>

            {/* Success Message */}
            {submitted && (
              <motion.div 
                className="p-4 bg-green-600/20 border border-green-500/50 rounded-xl text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-green-400 font-medium">
                  Thank you! Your message has been sent. We&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}
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
