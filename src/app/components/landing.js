import React from 'react';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Hero Section */}
      <motion.section 
        className="h-screen flex items-center justify-center text-center"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div>
          <h1 className="text-6xl font-bold mb-4">RainRelief</h1>
          <p className="text-2xl mb-8">Empowering farmers through smart rain incentives</p>
          <motion.button 
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.section>

      {/* About RainRelief Section */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-green-500">About RainRelief</h2>
          <p className="text-lg mb-4">
            RainRelief is an innovative platform that leverages blockchain technology to provide 
            financial incentives to farmers based on rainfall patterns. Our goal is to support 
            agricultural communities and promote sustainable farming practices.
          </p>
          <p className="text-lg">
            By connecting weather data with smart contracts, we ensure fair and transparent 
            distribution of incentives, helping farmers mitigate risks associated with 
            unpredictable weather conditions.
          </p>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 px-4 bg-blue-700"
        initial="initial"
        whileInView="animate"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li>Farmers register on the RainRelief platform</li>
            <li>Weather data is collected and verified using oracles</li>
            <li>Smart contracts automatically distribute incentives based on rainfall thresholds</li>
            <li>Farmers can withdraw their incentives through the platform</li>
          </ol>
        </div>
      </motion.section>

      {/* Contact the Developer Section */}
      <motion.section 
        className="py-20 px-4"
        initial="initial"
        whileInView="animate"
        variants={fadeIn}
        viewport={{ once: true }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-green-500">Contact the Developer</h2>
          <p className="text-lg mb-6">
            Have questions or want to learn more about RainRelief? Get in touch with our development team.
          </p>
          <motion.a 
            href="mailto:developer@rainrelief.com"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}