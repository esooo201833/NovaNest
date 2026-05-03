import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('novanest_lang', newLang);
  };

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/portfolio', label: t('nav.portfolio') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/pricing', label: t('nav.pricing') }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-primary/70 backdrop-blur-lg shadow-lg shadow-black/10 border-b border-light/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo with spin animation - BIGGER */}
          <Link
            to="/"
            className="flex items-center transition-transform duration-300 hover:scale-110"
          >
            <motion.img 
              src="/logos/novanest.png" 
              alt="NovaNest Marketing Agency" 
              className="h-16 w-auto object-contain drop-shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.15, rotate: 380 }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center ${i18n.language === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-8'}`}>
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={i18n.language === 'ar' ? 'ml-6' : 'mr-0'}
              >
                <Link
                  to={item.path}
                  className="text-secondary hover:text-white transition-colors relative group font-medium tracking-wide whitespace-nowrap"
                >
                  <motion.span
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className="inline-block"
                  >
                    {item.label}
                  </motion.span>
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-secondary"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </Link>
              </motion.div>
            ))}
            
            {/* Animated Language Switcher */}
            <motion.button
              onClick={toggleLanguage}
              className="relative px-6 py-2 border-2 border-secondary text-secondary rounded-full font-semibold overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.span 
                className="absolute inset-0 bg-secondary"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button with Animation */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-secondary p-2"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
              ) : (
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
              )}
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-primary/95 backdrop-blur-md rounded-2xl mb-4"
            >
              <div className="py-6 px-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="block text-secondary hover:text-white transition-colors text-lg font-medium py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-3 border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {i18n.language === 'en' ? 'العربية' : 'English'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
