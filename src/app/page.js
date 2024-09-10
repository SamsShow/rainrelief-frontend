'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from './assets/logoO.png';

export default function Landing() {
  // Define animations
  const container = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
        >
        <Image src={logo} alt="RainRelief Logo" className="w-52 mx-auto mb-8" />
          <motion.h1
            className="text-6xl font-bold mb-4"
            variants={fadeInUp}
          >
            RainRelief
          </motion.h1>
          <motion.p
            className="text-2xl mb-8"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Empowering farmers through smart rain incentives
          </motion.p>
          <motion.button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </motion.button>
        </motion.div>
      </section>

      {/* About RainRelief Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 className="text-4xl font-bold mb-6 text-green-500" variants={fadeInUp}>
            About RainRelief
          </motion.h2>
          <motion.p className="text-lg mb-4" variants={fadeInUp}>
            RainRelief is an innovative platform that leverages blockchain technology to provide
            financial incentives to farmers based on rainfall patterns. Our goal is to support
            agricultural communities and promote sustainable farming practices.
          </motion.p>
          <motion.p className="text-lg" variants={fadeInUp} transition={{ delay: 0.1 }}>
            By connecting weather data with smart contracts, we ensure fair and transparent
            distribution of incentives, helping farmers mitigate risks associated with
            unpredictable weather conditions.
          </motion.p>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-20 px-4 bg-blue-700"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
            How It Works
          </motion.h2>
          <motion.ol className="list-decimal list-inside space-y-4">
            <motion.li variants={fadeInUp}>Farmers register on the RainRelief platform</motion.li>
            <motion.li variants={fadeInUp} transition={{ delay: 0.1 }}>
              Weather data is collected and verified using oracles
            </motion.li>
            <motion.li variants={fadeInUp} transition={{ delay: 0.2 }}>
              Smart contracts automatically distribute incentives based on rainfall thresholds
            </motion.li>
            <motion.li variants={fadeInUp} transition={{ delay: 0.3 }}>
              Farmers can withdraw their incentives through the platform
            </motion.li>
          </motion.ol>
        </div>
      </motion.section>

      {/* Contact the Developer Section */}
      <motion.section
        className="py-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2 className="text-4xl font-bold mb-6 text-green-500" variants={fadeInUp}>
            Contact the Developer
          </motion.h2>
          <motion.p className="text-lg mb-6" variants={fadeInUp}>
            Have questions or want to learn more about RainRelief? Get in touch with our development team.
          </motion.p>
          <motion.a
            href="mailto:developer@rainrelief.com"
            className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Contact Us
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
