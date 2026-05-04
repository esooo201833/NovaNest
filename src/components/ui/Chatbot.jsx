import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaTimes, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: t('chatbot.greeting') }
  ]);
  const [inputValue, setInputValue] = useState('');

  const commonQuestions = t('chatbot.commonQuestions', { returnObjects: true }) || [];

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text }]);
    
    setTimeout(() => {
      let response = '';
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('price') || lowerText.includes('سعر') || lowerText.includes('كام')) {
        response = 'أسعارنا بتبدأ من $500/شهر لإدارة السوشيال ميديا. استخدم حاسبة الأسعار عشان تخصص باقتك!';
      } else if (lowerText.includes('start') || lowerText.includes('ابدأ') || lowerText.includes('إمتى')) {
        response = 'نبدأ فوراً بعد توقيع العقد! فريقنا جاهز يشتغل على مشروعك فوراً.';
      } else if (lowerText.includes('offer') || lowerText.includes('عرض') || lowerText.includes('خصم')) {
        response = 'عندنا خصم 10% للالتزام ربع سنوي و 20% للسنوي. كمان عروض خاصة للشركات الناشئة!';
      } else {
        response = 'شكراً لسؤالك! عايز تكلم فريقنا مباشرة؟';
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    }, 1000);
    
    setInputValue('');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/01110182114', '_blank');
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6 text-primary" />
        ) : (
          <FaComments className="w-6 h-6 text-primary" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-80 md:w-96 bg-primary border border-secondary/30 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {/* Header */}
            <div className="bg-secondary/20 p-4 border-b border-secondary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <FaComments className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-secondary font-bold">NovaNest Assistant</h3>
                  <p className="text-light/60 text-xs">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    msg.type === 'user' 
                      ? 'bg-secondary text-primary rounded-br-none' 
                      : 'bg-secondary/20 text-light rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            <div className="p-3 border-t border-secondary/20 bg-secondary/5">
              <p className="text-light/50 text-xs mb-2">أسئلة شائعة:</p>
              <div className="flex flex-wrap gap-2">
                {commonQuestions.slice(0, 3).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full hover:bg-secondary/30 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-secondary/20 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder={t('chatbot.placeholder')}
                className="flex-1 bg-secondary/10 border border-secondary/30 rounded-full px-4 py-2 text-light placeholder-light/40 focus:outline-none focus:border-secondary"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition"
              >
                <FaPaperPlane className="w-4 h-4 text-primary" />
              </button>
            </div>

            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 bg-green-500 text-white flex items-center justify-center gap-2 hover:bg-green-600 transition"
            >
              <FaWhatsapp className="w-5 h-5" />
              {t('chatbot.whatsappRedirect')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
