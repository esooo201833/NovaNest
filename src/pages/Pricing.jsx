import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building2, Building, Factory, Globe,
  Share2, Search, Megaphone, TrendingUp, 
  PenTool, Mail, BarChart3, Palette, 
  Video, Star, Calculator, Check, ArrowLeft,
  Zap, Shield, UserCheck, FileText, Calendar
} from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation();
  
  // State for calculator
  const [adsBudget, setAdsBudget] = useState(1000);
  const [selectedServices, setSelectedServices] = useState([]);
  const [businessSize, setBusinessSize] = useState('small');
  const [duration, setDuration] = useState('monthly');
  const [showQuote, setShowQuote] = useState(false);

  // Business size icons with animations
  const sizeIcons = {
    small: Building2,
    medium: Building,
    large: Factory,
    enterprise: Globe
  };

  // Service options with Lucide icons
  const services = [
    { id: 'social_media', name: 'Social Media Management', Icon: Share2, basePrice: 500, description: 'Content creation, scheduling & engagement' },
    { id: 'google_ads', name: 'Google Ads Management', Icon: Search, basePrice: 400, description: 'Campaign setup, optimization & monitoring' },
    { id: 'facebook_ads', name: 'Facebook/Instagram Ads', Icon: Megaphone, basePrice: 400, description: 'Ad creation, targeting & A/B testing' },
    { id: 'seo', name: 'SEO Optimization', Icon: TrendingUp, basePrice: 600, description: 'Keyword research, on-page & off-page SEO' },
    { id: 'content', name: 'Content Marketing', Icon: PenTool, basePrice: 450, description: 'Blog posts, articles & copywriting' },
    { id: 'email', name: 'Email Marketing', Icon: Mail, basePrice: 300, description: 'Newsletters, automation & campaigns' },
    { id: 'analytics', name: 'Analytics & Reporting', Icon: BarChart3, basePrice: 250, description: 'Monthly reports & insights' },
    { id: 'branding', name: 'Brand Strategy', Icon: Palette, basePrice: 800, description: 'Brand identity, guidelines & positioning' },
    { id: 'video', name: 'Video Production', Icon: Video, basePrice: 700, description: 'Short-form & long-form video content' },
    { id: 'influencer', name: 'Influencer Marketing', Icon: Star, basePrice: 500, description: 'Partnership management & outreach' },
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

  const total = calculateTotal();
  const savings = duration === 'quarterly' ? total * 0.1 : duration === 'yearly' ? total * 0.25 : 0;

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
              <Calculator className="w-10 h-10 text-secondary" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-secondary mb-4 font-display">
              Pricing Calculator
            </h1>
            <p className="text-xl text-light/70 max-w-2xl mx-auto">
              Customize your marketing package based on your needs and budget
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
                  Business Size
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'small', label: 'Small', desc: '1-10 employees' },
                    { id: 'medium', label: 'Medium', desc: '11-50 employees' },
                    { id: 'large', label: 'Large', desc: '51-200 employees' },
                    { id: 'enterprise', label: 'Enterprise', desc: '200+ employees' },
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
                          <SizeIcon className={`w-8 h-8 ${isSelected ? 'text-secondary' : 'text-light/60'}`} />
                        </motion.div>
                        <div className={`font-semibold text-sm ${isSelected ? 'text-secondary' : 'text-light/80'}`}>
                          {size.label}
                        </div>
                        <div className="text-light/50 text-xs">{size.desc}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Services Selection */}
              <div className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  Select Services
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
                                {service.name}
                              </h3>
                              {isSelected && (
                                <motion.div
                                  variants={checkVariants}
                                  initial="initial"
                                  animate="animate"
                                  className="text-green-400"
                                >
                                  <Check className="w-5 h-5" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-light/50 text-sm mt-1">{service.description}</p>
                            <p className={`text-sm mt-2 font-medium ${isSelected ? 'text-secondary' : 'text-secondary/60'}`}>
                              From ${service.basePrice}/mo
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
                    Monthly Ads Budget
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
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Management fee: 10% of budget (min $200)
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Duration */}
              <div className="bg-secondary/10 backdrop-blur-md rounded-2xl p-6 border border-secondary/20">
                <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                  <span className="bg-secondary text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                  Commitment Duration
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'monthly', label: 'Monthly', discount: 'No discount', save: 0 },
                    { id: 'quarterly', label: '3 Months', discount: '10% off', save: 10 },
                    { id: 'yearly', label: '12 Months', discount: '20% off', save: 20 },
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
                        {opt.discount}
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
                    <Calculator className="w-8 h-8 text-secondary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-secondary">Your Quote</h2>
                </div>
                
                {/* Selected Services List */}
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {selectedServices.length === 0 ? (
                    <p className="text-light/50 text-center py-4">Select services to see pricing</p>
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
                            <span className="text-light/80 text-sm">{service.name}</span>
                          </div>
                          <span className="text-secondary font-medium">${Math.round(price)}/mo</span>
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
                        <Megaphone className="w-4 h-4 text-secondary" />
                        <span className="text-light/80 text-sm">Ads Management Fee</span>
                      </div>
                      <span className="text-secondary font-medium">${Math.max(200, Math.round(adsBudget * 0.1))}/mo</span>
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
                      <Star className="w-4 h-4" />
                      You save ${Math.round(savings)}/month!
                    </div>
                  </motion.div>
                )}

                {/* Total */}
                <div className="border-t-2 border-secondary/30 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-light/70">Subtotal</span>
                    <span className="text-light/70">${Math.round(total + savings)}/mo</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-green-400">Discount</span>
                      <span className="text-green-400">-${Math.round(savings)}/mo</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-secondary/20">
                    <span className="text-secondary font-bold text-xl">Total</span>
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
                  {selectedServices.length > 0 ? 'Get Detailed Quote' : 'Select Services First'}
                </motion.button>

                {/* Features */}
                <div className="mt-6 space-y-2 text-sm text-light/60">
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Shield className="w-4 h-4 text-green-400" /> No setup fees
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Zap className="w-4 h-4 text-green-400" /> Cancel anytime
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <UserCheck className="w-4 h-4 text-green-400" /> Dedicated manager
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <FileText className="w-4 h-4 text-green-400" /> Monthly reports
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
                <Star className="w-8 h-8 text-secondary" />
              </motion.div>
              <h2 className="text-3xl font-bold text-secondary">Your Custom Quote</h2>
            </div>
            <p className="text-light/60 text-center mb-6">Here&apos;s your personalized marketing package</p>
            
            <div className="bg-secondary/10 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                <span className="text-light/70 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Business Size
                </span>
                <span className="text-secondary capitalize">{businessSize}</span>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                <span className="text-light/70 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Duration
                </span>
                <span className="text-secondary capitalize">{duration}</span>
              </div>
              {selectedServices.some(s => ['google_ads', 'facebook_ads'].includes(s)) && (
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-secondary/20">
                  <span className="text-light/70 flex items-center gap-2">
                    <Megaphone className="w-4 h-4" /> Monthly Ad Budget
                  </span>
                  <span className="text-secondary">${adsBudget.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-light/70 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Selected Services
                </span>
                <span className="text-secondary">{selectedServices.length}</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="text-light/60 mb-2">Total Monthly Investment</div>
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
                  <Star className="w-4 h-4" />
                  You save ${Math.round(savings)}/month with {duration} plan!
                </div>
              )}
            </div>

            <div className="space-y-3">
              <motion.button
                className="w-full py-4 bg-secondary text-primary rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-5 h-5" />
                Start Your Campaign
              </motion.button>
              <button
                onClick={() => setShowQuote(false)}
                className="w-full py-3 text-light/60 hover:text-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Calculator
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Pricing;
