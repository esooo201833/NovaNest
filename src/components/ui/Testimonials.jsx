import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const { t } = useTranslation();
  const clients = t('testimonials.clients', { returnObjects: true }) || [];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary via-accent/10 to-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4 font-display">
            {t('testimonials.title')}
          </h2>
          <p className="text-light/70 text-lg">{t('testimonials.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              className="bg-primary/60 backdrop-blur-sm p-8 rounded-2xl border border-secondary/20 relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(234, 219, 200, 0.15)" }}
            >
              <FaQuoteLeft className="absolute top-4 right-4 w-8 h-8 text-secondary/20" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(client.rating)].map((_, i) => (
                  <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-light/90 mb-6 leading-relaxed">&quot;{client.quote}&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-secondary font-bold">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-secondary font-semibold">{client.name}</h4>
                  <p className="text-light/60 text-sm">{client.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
