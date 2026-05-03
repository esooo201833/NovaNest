import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaBuilding, FaCity, FaIndustry, FaGlobe,
  FaShareAlt, FaSearch, FaBullhorn, FaChartLine, 
  FaPenNib, FaEnvelope, FaChartBar, FaPaintBrush, 
  FaVideo, FaStar, FaCalculator, FaCheck, FaArrowLeft,
  FaBolt, FaShieldAlt, FaUserCheck, FaFileAlt, FaCalendarAlt
} from 'react-icons/fa';

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // State for calculator
  const [adsBudget, setAdsBudget] = useState(1000);
  const [selectedServices, setSelectedServices] = useState([]);
  const [businessSize, setBusinessSize] = useState('small');
  const [duration, setDuration] = useState('monthly');
  const [showQuote, setShowQuote] = useState(false);

  // Business size icons with animations
  const sizeIcons = {
    small: FaBuilding,
    medium: FaCity,
    large: FaIndustry,
    enterprise: FaGlobe
  };

  // Service options with React Icons
  const services = [
    { id: 'social_media', key: 'socialMedia', Icon: FaShareAlt, basePrice: 500 },
    { id: 'google_ads', key: 'googleAds', Icon: FaSearch, basePrice: 400 },
    { id: 'facebook_ads', key: 'facebookAds', Icon: FaBullhorn, basePrice: 400 },
    { id: 'seo', key: 'seo', Icon: FaChartLine, basePrice: 600 },
    { id: 'content', key: 'content', Icon: FaPenNib, basePrice: 450 },
    { id: 'email', key: 'email', Icon: FaEnvelope, basePrice: 300 },
    { id: 'analytics', key: 'analytics', Icon: FaChartBar, basePrice: 250 },
    { id: 'branding', key: 'branding', Icon: FaPaintBrush, basePrice: 800 },
    { id: 'video', key: 'video', Icon: FaVideo, basePrice: 700 },
    { id: 'influencer', key: 'influencer', Icon: FaStar, basePrice: 500 },
  ];

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        let servicePrice = service.basePrice;
        
        if (businessSize === 'medium') servicePrice *= 1.3;
        if (businessSize === 'large') servicePrice *= 1.6;
        if (businessSize === 'enterprise') servicePrice *= 2.2;
        
        total += servicePrice;
      }
    });

    if (selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s))) {
      const adsFee = Math.max(200, adsBudget * 0.1);
      total += adsFee;
    }

    if (duration === 'quarterly') total *= 0.9;
    if (duration === 'yearly') total *= 0.8;

    return Math.round(total);
  };

  const toggleService = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const budgetOptions = [500, 1000, 2500, 5000, 10000, 25000];

  // Calculate pre-discount total (before any duration discount)
  const calculateBaseTotal = () => {
    let total = 0;
    selectedServices.forEach(serviceId => {
      const service = services.find(s => s.id === serviceId);
      if (service) {
        let servicePrice = service.basePrice;
        if (businessSize === 'medium') servicePrice *= 1.3;
        if (businessSize === 'large') servicePrice *= 1.6;
        if (businessSize === 'enterprise') servicePrice *= 2.2;
        total += servicePrice;
      }
    });
    if (selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s))) {
      const adsFee = Math.max(200, adsBudget * 0.1);
      total += adsFee;
    }
    return Math.round(total);
  };

  const total = calculateTotal();
  // Savings calculated from base (pre-discount) total for accuracy
  const baseTotal = calculateBaseTotal();
  const savings = duration === 'quarterly' ? Math.round(baseTotal * 0.1) : duration === 'yearly' ? Math.round(baseTotal * 0.2) : 0;

  // Animation variants
  const iconHoverVariants = {
    hover: { 
      scale: 1.2, 
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.5 }
    }
  };

  const checkVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200 } },
    hover: { scale: 1.2 }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-primary">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <FaCalculator className="w-10 h-10 text-secondary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4 font-display">
              {t('pricing.title')}
            </h1>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Configuration */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Step 1: Business Size */}
              <div className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  {t('pricing.calculator.step1')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'small', labelKey: 'small', empKey: 'small' },
                    { id: 'medium', labelKey: 'medium', empKey: 'medium' },
                    { id: 'large', labelKey: 'large', empKey: 'large' },
                    { id: 'enterprise', labelKey: 'enterprise', empKey: 'enterprise' },
                  ].map((size) => {
                    const SizeIcon = sizeIcons[size.id];
                    const isSelected = businessSize === size.id;
                    return (
                      <motion.button
                        key={size.id}
                        onClick={() => setBusinessSize(size.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                          isSelected
                            ? 'border-secondary bg-secondary/20 shadow-lg'
                            : 'border-secondary/20 hover:border-secondary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="flex justify-center mb-2"
                          variants={iconHoverVariants}
                          whileHover="hover"
                        >
                          <SizeIcon className={`text-2xl ${isSelected ? 'text-secondary' : 'text-light/60'}`} />
                        </motion.div>
                        <div className={`font-semibold text-sm ${isSelected ? 'text-secondary' : 'text-light/80'}`}>
                          {t(`pricing.calculator.businessSize.${size.labelKey}`)}
                        </div>
                        <div className="text-light/50 text-xs">{t(`pricing.calculator.businessSize.employees.${size.empKey}`)}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Services Selection */}
              <div className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  {t('pricing.calculator.step2')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <motion.div
                        key={service.id}
                        onClick={() => toggleService(service.id)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? 'border-secondary bg-secondary/20 shadow-lg'
                            : 'border-secondary/20 hover:border-secondary/50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            className={`p-2 rounded-lg ${isSelected ? 'bg-secondary/30' : 'bg-secondary/10'}`}
                            variants={iconHoverVariants}
                            whileHover="hover"
                          >
                            <service.Icon className={`w-6 h-6 ${isSelected ? 'text-secondary' : 'text-light/60'}`} />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-semibold ${isSelected ? 'text-secondary' : 'text-light/90'}`}>
                                {t(`pricing.calculator.services.${service.key}.name`)}
                              </h3>
                              {isSelected && (
                                <motion.div
                                  variants={checkVariants}
                                  initial="initial"
                                  animate="animate"
                                  className="text-green-400"
                                >
                                  <FaCheck className="w-5 h-5" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-light/50 text-sm mt-1">{t(`pricing.calculator.services.${service.key}.description`)}</p>
                            <p className={`text-sm mt-2 font-medium ${isSelected ? 'text-secondary' : 'text-secondary/60'}`}>
                              {t('pricing.calculator.from')} ${service.basePrice}{t('pricing.calculator.perMonth')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Ads Budget */}
              {selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s)) && (
                <motion.div 
                  className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                    <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    {t('pricing.calculator.adsBudget.title')}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      {budgetOptions.map((budget) => (
                        <motion.button
                          key={budget}
                          onClick={() => setAdsBudget(budget)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            adsBudget === budget
                              ? 'border-secondary bg-secondary/20'
                              : 'border-secondary/20 hover:border-secondary/50'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={adsBudget === budget ? 'text-secondary' : 'text-light/70'}>
                            ${budget.toLocaleString()}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                    <div className="text-light/60 text-sm flex items-center gap-2">
                      <FaBolt className="w-4 h-4 text-yellow-400" />
                      {t('pricing.calculator.adsBudget.managementFee')}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Duration */}
              <div className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                  {t('pricing.calculator.step4')}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'monthly', label: t('pricing.calculator.duration.monthly'), save: 0 },
                    { id: 'quarterly', label: t('pricing.calculator.duration.quarterly'), save: 10 },
                    { id: 'yearly', label: t('pricing.calculator.duration.yearly'), save: 20 },
                  ].map((opt) => (
                    <motion.button
                      key={opt.id}
                      onClick={() => setDuration(opt.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        duration === opt.id
                          ? 'border-secondary bg-secondary/20 shadow-lg'
                          : 'border-secondary/20 hover:border-secondary/50'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-secondary font-semibold">{opt.label}</div>
                      <div className={`text-sm mt-1 ${opt.save > 0 ? 'text-green-400' : 'text-light/50'}`}>
                        {opt.save > 0 ? `${opt.save}%` : '-'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Panel - Summary */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="sticky top-24 bg-secondary/15 backdrop-blur-md rounded-2xl p-6 border border-secondary/30 shadow-xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    <FaCalculator className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-secondary">{t('pricing.calculator.yourQuote')}</h2>
                </div>
                
                {/* Selected Services List */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {selectedServices.length === 0 ? (
                    <p className="text-light/50 text-center py-4">{t('pricing.calculator.selectServices')}</p>
                  ) : (
                    selectedServices.map((serviceId) => {
                      const service = services.find(s => s.id === serviceId);
                      let price = service.basePrice;
                      if (businessSize === 'medium') price *= 1.3;
                      if (businessSize === 'large') price *= 1.6;
                      if (businessSize === 'enterprise') price *= 2.2;
                      
                      return (
                        <motion.div 
                          key={serviceId} 
                          className="flex justify-between items-center py-2 border-b border-secondary/10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <div className="flex items-center gap-2">
                            <service.Icon className="w-4 h-4 text-secondary" />
                            <span className="text-light/80 text-sm">{t(`pricing.calculator.services.${service.key}.name`)}</span>
                          </div>
                          <span className="text-secondary font-medium">${Math.round(price)}{t('pricing.calculator.perMonth')}</span>
                        </motion.div>
                      );
                    })
                  )}
                  
                  {/* Ads Fee */}
                  {selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s)) && (
                    <motion.div 
                      className="flex justify-between items-center py-2 border-b border-secondary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <FaBullhorn className="w-4 h-4 text-secondary" />
                        <span className="text-light/80 text-sm">{t('pricing.calculator.quote.adsFee')}</span>
                      </div>
                      <span className="text-secondary font-medium">${Math.max(200, Math.round(adsBudget * 0.1))}{t('pricing.calculator.perMonth')}</span>
                    </motion.div>
                  )}
                </div>

                {/* Savings */}
                {savings > 0 && (
                  <motion.div 
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="text-green-400 text-center flex items-center justify-center gap-2">
                      <FaStar className="w-4 h-4" />
                      {t('pricing.calculator.youSave')} ${Math.round(savings)}{t('pricing.calculator.perMonth')}!
                    </div>
                  </motion.div>
                )}

                {/* Total */}
                <div className="border-t-2 border-secondary/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-light/70">{t('pricing.calculator.subtotal')}</span>
                    <span className="text-light/70">${Math.round(total + savings)}{t('pricing.calculator.perMonth')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-400">{t('pricing.calculator.discount')}</span>
                      <span className="text-green-400">-${Math.round(savings)}{t('pricing.calculator.perMonth')}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-secondary/20">
                    <span className="text-secondary font-bold text-xl">{t('pricing.calculator.total')}</span>
                    <motion.span 
                      className="text-secondary font-bold text-2xl"
                      key={total}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      ${total}
                    </motion.span>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => setShowQuote(true)}
                  disabled={selectedServices.length === 0}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    selectedServices.length > 0
                      ? 'bg-secondary text-primary hover:bg-secondary/90 shadow-lg shadow-secondary/20'
                      : 'bg-secondary/20 text-secondary/50 cursor-not-allowed'
                  }`}
                  whileHover={selectedServices.length > 0 ? { scale: 1.02 } : {}}
                  whileTap={selectedServices.length > 0 ? { scale: 0.98 } : {}}
                >
                  {selectedServices.length > 0 ? t('pricing.calculator.startCampaign') : t('pricing.calculator.selectServices')}
                </motion.button>

                {/* Features */}
                <div className="mt-6 space-y-2 text-sm text-light/60">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <FaShieldAlt className="w-4 h-4 text-green-400" /> {t('pricing.calculator.features.noSetupFees')}
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FaBolt className="w-4 h-4 text-green-400" /> {t('pricing.calculator.features.cancelAnytime')}
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <FaUserCheck className="w-4 h-4 text-green-400" /> {t('pricing.calculator.features.dedicatedManager')}
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FaFileAlt className="w-4 h-4 text-green-400" /> {t('pricing.calculator.features.monthlyReports')}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuote && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowQuote(false)}
        >
          <motion.div
            className="bg-primary border border-secondary/30 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <FaStar className="w-8 h-8 text-secondary" />
              </motion.div>
              <h2 className="text-3xl font-bold text-secondary">{t('pricing.calculator.quote.title')}</h2>
            </div>
            <p className="text-light/60 text-center mb-6">{t('pricing.calculator.quote.subtitle')}</p>
            
            <div className="bg-secondary/10 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                <span className="text-light/70 flex items-center gap-2">
                  <FaBuilding className="w-4 h-4" /> {t('pricing.calculator.quote.businessSize')}
                </span>
                <span className="text-secondary">{t(`pricing.calculator.businessSize.${businessSize}`)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                <span className="text-light/70 flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4" /> {t('pricing.calculator.quote.duration')}
                </span>
                <span className="text-secondary">{t(`pricing.calculator.duration.${duration}`)}</span>
              </div>
              {selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s)) && (
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                  <span className="text-light/70 flex items-center gap-2">
                    <FaBullhorn className="w-4 h-4" /> {t('pricing.calculator.quote.adsBudget')}
                  </span>
                  <span className="text-secondary">${adsBudget.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-light/70 flex items-center gap-2">
                  <FaCheck className="w-4 h-4" /> {t('pricing.calculator.quote.selectedServices')}
                </span>
                <span className="text-secondary">{selectedServices.length}</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-light/60 mb-2">{t('pricing.calculator.total')}</div>
              <motion.div 
                className="text-5xl font-bold text-secondary"
                key={total}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                ${total}
              </motion.div>
              {savings > 0 && (
                <div className="text-green-400 mt-2 flex items-center justify-center gap-2">
                  <FaStar className="w-4 h-4" />
                  {t('pricing.calculator.youSave')} ${Math.round(savings)}{t('pricing.calculator.perMonth')}!
                </div>
              )}
            </div>

            <div className="space-y-3">
              <motion.button
                onClick={() => { setShowQuote(false); navigate('/contact'); }}
                className="w-full py-4 bg-secondary text-primary rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaBolt className="w-5 h-5" />
                {t('pricing.calculator.startCampaign')}
              </motion.button>
              <button
                onClick={() => setShowQuote(false)}
                className="w-full py-3 text-light/60 hover:text-secondary transition-colors flex items-center justify-center gap-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                {t('pricing.calculator.backToCalculator')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Pricing;
