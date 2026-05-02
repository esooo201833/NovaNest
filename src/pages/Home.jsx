import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuredRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      }
    }
  };

  // Strong animation for NovaNest title
  const titleVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      scale: 0.5,
      rotateX: -90
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Animation for Marketing Agency
  const subtitleVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0.8,
      filter: "blur(10px)"
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  // Animation for tagline
  const taglineVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      x: -50
    },
    visible: {
      y: 0,
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4
      }
    }
  };

  // Animation for CTA button
  const buttonVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0,
      rotate: -10
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.6
      }
    }
  };

  const services = [
    {
      title: 'Social Media',
      description: 'Strategic social media management that builds your brand presence',
      icon: '📱'
    },
    {
      title: 'Content Creation',
      description: 'Compelling content that tells your brand story',
      icon: '✨'
    },
    {
      title: 'Digital Marketing',
      description: 'Data-driven campaigns that deliver results',
      icon: '📊'
    },
    {
      title: 'Brand Strategy',
      description: 'Comprehensive brand positioning and identity',
      icon: '🎯'
    }
  ];

  const featuredWork = [
    {
      title: 'Fashion Brand Launch',
      category: 'Social Media',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      title: 'Tech Startup',
      category: 'Brand Strategy',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
    },
    {
      title: 'Restaurant Chain',
      category: 'Content Creation',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop'
    }
  ];


  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-accent/30 pt-20">
        <motion.div 
          ref={heroRef} 
          className="text-center px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* NovaNest - Strong 3D Reveal Animation */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-secondary mb-2 font-display tracking-tight"
            variants={titleVariants}
            whileHover={{ 
              scale: 1.05, 
              textShadow: "0 0 30px rgba(234, 219, 200, 0.5)",
              transition: { duration: 0.3 }
            }}
            style={{ perspective: "1000px" }}
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-secondary via-light to-secondary bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              NovaNest
            </motion.span>
          </motion.h1>

          {/* Marketing Agency - Blur Reveal */}
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl text-light font-display mb-4"
            variants={subtitleVariants}
          >
            <motion.span
              whileHover={{ scale: 1.1, letterSpacing: "0.1em" }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              Marketing Agency
            </motion.span>
          </motion.p>

          {/* Tagline - Slide In */}
          <motion.p 
            className="text-xl md:text-2xl text-light/80 mb-8 max-w-2xl mx-auto"
            variants={taglineVariants}
          >
            <motion.span
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {t('hero.tagline')}
            </motion.span>
          </motion.p>

          {/* CTA Button - Bounce In with Pulse */}
          <motion.div variants={buttonVariants}>
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 0 0 rgba(234, 219, 200, 0)",
                  "0 0 0 10px rgba(234, 219, 200, 0.3)",
                  "0 0 0 0 rgba(234, 219, 200, 0)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block rounded-full"
            >
              <Link
                to="/pricing"
                className="inline-block px-10 py-5 bg-secondary text-primary rounded-full font-bold text-xl relative overflow-hidden group shadow-xl shadow-secondary/30"
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-light via-white to-light"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <motion.span 
                  className="relative z-10 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{t('hero.cta')}</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h2>
          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-primary/60 backdrop-blur-sm p-8 rounded-xl shadow-lg cursor-pointer border border-light/20"
                initial={{ opacity: 0, y: 80, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05, 
                  boxShadow: "0 20px 40px rgba(234, 219, 200, 0.2)",
                  transition: { duration: 0.3, ease: "easeOut" } 
                }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.3, rotate: 10, y: -5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {service.icon}
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-secondary mb-2 font-display"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-light/80 leading-relaxed"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {service.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/95">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary text-center mb-4 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('portfolio.title')}
          </motion.h2>
          <motion.p 
            className="text-center text-light/80 mb-12 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('portfolio.subtitle')}
          </motion.p>
          <div
            ref={featuredRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredWork.map((work, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-64 object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex items-end p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <motion.p 
                      className="text-light/80 text-sm mb-1 font-medium"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      {work.category}
                    </motion.p>
                    <motion.h3 
                      className="text-xl font-bold text-secondary font-display"
                      initial={{ x: -20 }}
                      whileHover={{ x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {work.title}
                    </motion.h3>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="inline-block px-8 py-4 border-2 border-secondary text-secondary rounded-full font-semibold text-lg relative overflow-hidden group hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300"
            >
              <motion.span 
                className="absolute inset-0 bg-secondary"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                View All Work
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
