import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const FloatingActions = () => {
  const { t } = useTranslation();
  const whatsappNumber = '01110182114';
  const email = 'novanestcontactus@gmail.com';

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${email}`;
  };

  // Facebook & Instagram — links to be added when pages are ready
  const handleFacebook = () => {
    // TODO: Replace '#' with actual Facebook page URL
    window.open('https://facebook.com', '_blank');
  };

  const handleInstagram = () => {
    // TODO: Replace '#' with actual Instagram page URL
    window.open('https://instagram.com', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button — with pulse ring */}
      <div className="relative">
        {/* Pulse Effect Ring — positioned relative to WhatsApp button */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-green-500 pointer-events-none"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.button
          onClick={handleWhatsApp}
          aria-label={t('floatingActions.whatsapp')}
          title={t('floatingActions.whatsapp')}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaWhatsapp className="w-7 h-7 text-white" />
          </motion.div>
        </motion.button>
      </div>

      {/* Email Button */}
      <motion.button
        onClick={handleEmail}
        aria-label={t('floatingActions.email')}
        title={t('floatingActions.email')}
        className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
        >
          <FaEnvelope className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.button>

      {/* Facebook Button */}
      <motion.button
        onClick={handleFacebook}
        aria-label={t('floatingActions.facebook')}
        title={t('floatingActions.facebook')}
        className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
        >
          <FaFacebook className="w-7 h-7 text-white" />
        </motion.div>
      </motion.button>

      {/* Instagram Button */}
      <motion.button
        onClick={handleInstagram}
        aria-label={t('floatingActions.instagram')}
        title={t('floatingActions.instagram')}
        className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 6 }}
        >
          <FaInstagram className="w-7 h-7 text-white" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingActions;
