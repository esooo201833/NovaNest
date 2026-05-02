import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Booking = () => {
  const { t } = useTranslation();
  const pricingRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    gsap.from(pricingRef.current.children, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, []);

  const pricingPlans = [
    {
      id: 'basic',
      title: t('booking.basic.title'),
      price: t('booking.basic.price'),
      features: [
        t('booking.basic.features.0', 'Social Media Management'),
        t('booking.basic.features.1', 'Content Creation'),
        t('booking.basic.features.2', 'Monthly Reports')
      ],
      popular: false
    },
    {
      id: 'pro',
      title: t('booking.pro.title'),
      price: t('booking.pro.price'),
      features: [
        t('booking.pro.features.0', 'All Basic Features'),
        t('booking.pro.features.1', 'SEO Optimization'),
        t('booking.pro.features.2', 'Email Marketing'),
        t('booking.pro.features.3', 'Analytics Dashboard')
      ],
      popular: true
    },
    {
      id: 'enterprise',
      title: t('booking.enterprise.title'),
      price: t('booking.enterprise.price'),
      features: [
        t('booking.pro.features.0', 'All Pro Features'),
        t('booking.enterprise.features.1', 'Custom Strategy'),
        t('booking.enterprise.features.2', 'Dedicated Account Manager'),
        t('booking.enterprise.features.3', '24/7 Support')
      ],
      popular: false
    }
  ];

  const handleCardHover = (e, id) => {
    setHoveredCard(id);
    gsap.to(e.currentTarget, {
      y: -20,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleCardLeave = (e) => {
    setHoveredCard(null);
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-primary">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-accent/30">
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-secondary text-center mb-6 font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('booking.title')}
          </motion.h1>
          <motion.p 
            className="text-center text-light/80 mb-16 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('booking.subtitle')}
          </motion.p>

          <div
            ref={pricingRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative bg-primary/60 backdrop-blur-sm rounded-2xl p-8 shadow-2xl cursor-pointer border-2 ${
                  plan.popular ? 'border-secondary shadow-secondary/20' : 'border-light/20'
                } ${hoveredCard === plan.id ? 'shadow-2xl scale-105' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={(e) => handleCardHover(e, plan.id)}
                onMouseLeave={handleCardLeave}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div 
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                  >
                    <span className="bg-secondary text-primary px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                {/* Plan Title */}
                <h3 className="text-2xl font-bold text-secondary mb-4 text-center font-display">
                  {plan.title}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-5xl font-bold text-secondary">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-light/70">/month</span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <span className="text-secondary mt-1 text-lg">✓</span>
                      <span className="text-light/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button with strong animation */}
                <motion.button
                  className={`w-full py-4 rounded-lg font-semibold text-lg relative overflow-hidden ${
                    plan.popular
                      ? 'bg-secondary text-primary'
                      : 'bg-secondary/20 text-secondary border-2 border-secondary/50 hover:bg-secondary hover:text-primary'
                  }`}
                  onMouseEnter={handleButtonHover}
                  onMouseLeave={handleButtonLeave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-white"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">
                    {plan.popular ? 'Get Started' : 'Learn More'}
                  </span>
                </motion.button>

                {/* Glow Effect */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent rounded-2xl pointer-events-none" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-light/70 mb-8 text-lg">
              All plans include a 30-day free trial. No credit card required.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { icon: '🔒', text: 'Secure Payment' },
                { icon: '📞', text: '24/7 Support' },
                { icon: '🔄', text: 'Cancel Anytime' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-secondary bg-primary/40 backdrop-blur-sm px-6 py-3 rounded-full border border-light/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            {[
              {
                question: 'Can I upgrade my plan later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans.'
              },
              {
                question: 'Is there a contract?',
                answer: 'No, all our plans are month-to-month. You can cancel anytime without penalties.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-primary/60 backdrop-blur-sm rounded-xl p-6 shadow-lg cursor-pointer border border-light/20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <h3 className="text-xl font-bold text-secondary mb-2 font-display">
                  {faq.question}
                </h3>
                <p className="text-light/70">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
