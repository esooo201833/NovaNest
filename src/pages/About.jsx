import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop'
    },
    {
      name: 'Michael Chen',
      role: 'Digital Strategist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
    },
    {
      name: 'David Kim',
      role: 'Tech Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-primary">
      {/* Story Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary to-accent/30">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-secondary mb-8 text-center font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-light/80 leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('about.story')}
          </motion.p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-accent/20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('about.team')}
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-primary/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg cursor-pointer group border border-light/20"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.04,
                  boxShadow: "0 20px 40px rgba(234, 219, 200, 0.15)",
                  transition: { duration: 0.3 } 
                }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-secondary">
                      <p className="font-bold font-display text-lg">{member.name}</p>
                      <p className="text-sm opacity-90">{member.role}</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-secondary mb-1 font-display">
                    {member.name}
                  </h3>
                  <p className="text-light/70">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-accent/20 to-primary">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-secondary text-center mb-12 font-display"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('about.valuesTitle')}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { key: 'creativity', emoji: '💡' },
              { key: 'excellence', emoji: '⭐' },
              { key: 'collaboration', emoji: '🤝' }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-primary/60 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center border border-light/20"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.18, ease: "easeOut" }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.04,
                  boxShadow: "0 20px 40px rgba(234, 219, 200, 0.15)",
                  transition: { duration: 0.3 } 
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mb-4"
                >
                  <span className="text-4xl">
                    {value.emoji}
                  </span>
                </motion.div>
                <h3 className="text-2xl font-bold text-secondary mb-4 font-display">{t(`about.values.${value.key}.title`)}</h3>
                <p className="text-light/80 leading-relaxed">{t(`about.values.${value.key}.description`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
