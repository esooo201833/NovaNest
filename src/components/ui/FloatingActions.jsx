import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
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

      {/* Pulse Effect Ring for WhatsApp */}
      <motion.div
        className="absolute bottom-0 right-0 w-14 h-14 rounded-full border-2 border-green-500"
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default FloatingActions;
