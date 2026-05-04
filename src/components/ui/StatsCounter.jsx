import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { FaUsers, FaProjectDiagram, FaClock, FaUserTie } from 'react-icons/fa';

const StatItem = ({ icon: Icon, end, suffix, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = end / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-8 h-8 text-secondary" />
      </motion.div>
      <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 font-display">
        {count}{suffix}
      </div>
      <p className="text-light/70">{label}</p>
    </motion.div>
  );
};

const StatsCounter = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: FaUsers, end: 50, suffix: '+', label: t('stats.happyClients') },
    { icon: FaProjectDiagram, end: 200, suffix: '+', label: t('stats.projectsDone') },
    { icon: FaClock, end: 3, suffix: '+', label: t('stats.yearsExperience') },
    { icon: FaUserTie, end: 15, suffix: '+', label: t('stats.teamMembers') },
  ];

  return (
    <section className="py-16 px-4 bg-secondary/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
