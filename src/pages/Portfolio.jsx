import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const Portfolio = () => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);

  const portfolioItems = [
    {
      id: 1,
      title: 'Summer Collection',
      platform: 'Instagram',
      likes: 1234,
      comments: 89,
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop',
      type: 'instagram'
    },
    {
      id: 2,
      title: 'Product Launch',
      platform: 'Facebook',
      likes: 2345,
      comments: 156,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=500&fit=crop',
      type: 'facebook'
    },
    {
      id: 3,
      title: 'Brand Story',
      platform: 'Instagram',
      likes: 3456,
      comments: 234,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
      type: 'instagram'
    },
    {
      id: 4,
      title: 'Event Promo',
      platform: 'Facebook',
      likes: 4567,
      comments: 312,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop',
      type: 'facebook'
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      platform: 'Instagram',
      likes: 5678,
      comments: 445,
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=500&fit=crop',
      type: 'instagram'
    },
    {
      id: 6,
      title: 'Customer Testimonial',
      platform: 'Facebook',
      likes: 6789,
      comments: 567,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop',
      type: 'facebook'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-primary">
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-accent/30">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-secondary text-center mb-4 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('portfolio.title')}
          </motion.h1>
          <motion.p 
            className="text-center text-light/80 mb-12 text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="relative bg-primary/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg cursor-pointer group border border-light/20"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Platform Badge */}
                <motion.div 
                  className="absolute top-2 left-2 z-10 px-3 py-1 rounded-full text-xs font-bold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {item.type === 'instagram' ? (
                    <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 rounded-full">
                      Instagram
                    </span>
                  ) : (
                    <span className="bg-blue-600 px-2 py-1 rounded-full">Facebook</span>
                  )}
                </motion.div>

                {/* Floating Animations */}
                <AnimatePresence>
                  {hoveredCard === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute top-4 right-4 flex flex-col items-center gap-1 pointer-events-none"
                    >
                      <motion.span
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="text-red-500 text-xl"
                      >
                        ❤️
                      </motion.span>
                      <span className="text-secondary text-sm font-semibold">{item.likes}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex items-end p-6"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-2 font-display">{item.title}</h3>
                      <div className="flex items-center gap-4 text-light/80">
                        <span className="flex items-center gap-1">
                          <span className="text-red-400">❤️</span>
                          {item.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-blue-400">💬</span>
                          {item.comments}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 bg-primary/40">
                  <h3 className="text-xl font-bold text-secondary mb-2 font-display">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-light/70">
                    <div className="flex items-center gap-2">
                      <span>❤️</span>
                      <span>{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>💬</span>
                      <span>{item.comments}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary mb-6 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('common.readyToCreate')}
          </motion.h2>
          <motion.p 
            className="text-xl text-light/80 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('common.bringBrandToLife')}
          </motion.p>
          <motion.button
            className="px-8 py-4 bg-secondary text-primary rounded-full font-semibold text-lg relative overflow-hidden group shadow-lg shadow-secondary/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(234, 219, 200, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="absolute inset-0 bg-light"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
              {t('portfolio.cta')}
            </span>
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
