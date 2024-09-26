'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from './assets/logoO.png';
import { Globe, Camera } from 'lucide-react';

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
    <div className="min-h-screen bg-zinc-900 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <Image src={logo} alt="RainRelief Logo" className="w-12 h-12" />
          <span className="font-bold text-xl">RainRelief</span>
        </div>
        <button className="px-4 py-2 bg-zinc-800 rounded-full text-sm hover:bg-zinc-700 transition duration-300">CONTACT US</button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <motion.section 
          className="py-20 text-center"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-6 h-6 mr-2" />
            <motion.span className="font-bold" variants={fadeInUp}>120+</motion.span>
            <motion.span className="text-gray-400 ml-2" variants={fadeInUp}>Farmers supported</motion.span>
          </div>
          <motion.h1 
            className="text-5xl font-bold mb-4"
            variants={fadeInUp}
          >
            Empowering farmers through smart rain incentives
          </motion.h1>
          <motion.div className="flex justify-center space-x-4 mb-8" variants={fadeInUp}>
            {['BLOCKCHAIN', 'AGRICULTURE', 'SUSTAINABILITY', 'INNOVATION', 'WEATHER'].map((tag) => (
              <span key={tag} className="text-sm text-gray-400">{tag}</span>
            ))}
          </motion.div>
          <motion.button
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Learn More
          </motion.button>
        </motion.section>

        {/* About RainRelief Section */}
        <motion.section
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2 className="text-4xl font-bold mb-6 text-green-500" variants={fadeInUp}>
            About RainRelief
          </motion.h2>
          <div className="grid grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
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
            </motion.div>
            <motion.div className="relative" variants={fadeInUp}>
              <img src="/api/placeholder/400/300" alt="Farming scene" className="w-full h-auto rounded-lg" />
              <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full px-3 py-1 text-sm">Smart Contracts</div>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          className="py-20 bg-zinc-800 rounded-lg"
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
          className="py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          <motion.h2 className="text-4xl font-bold mb-6 text-green-500" variants={fadeInUp}>
            Contact the Developer
          </motion.h2>
          <div className="grid grid-cols-3 gap-4">
            <motion.div className="col-span-2" variants={fadeInUp}>
              <p className="text-lg mb-6">
                Have questions or want to learn more about RainRelief? Get in touch with our development team.
              </p>
              <motion.a
                href="mailto:sakshamtyagi2008@gmail.com"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Contact Us
              </motion.a>
            </motion.div>
            <motion.div className="relative" variants={fadeInUp}>
              <img src="/api/placeholder/300/200" alt="Developer at work" className="w-full h-auto rounded-lg" />
              <Camera className="absolute top-4 right-4 w-6 h-6 text-white" />
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-12 p-4 bg-zinc-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Join Us in Revolutionizing Agricultural Support</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <h3 className="font-bold mb-2">PLATFORM</h3>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>Smart Contracts</li>
                <li>Weather Oracles</li>
                <li>Farmer Dashboard</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">COMPANY</h3>
              <ul className="text-sm space-y-1 text-gray-400">
                <li>About Us</li>
                <li>Mission</li>
                <li>Team</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">OUR IMPACT</h3>
              <p className="text-sm text-gray-400">Empowering farmers, promoting sustainable agriculture, and building resilient communities through innovative blockchain solutions.</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">GET INVOLVED</h3>
              <button className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition duration-300">SIGN UP</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}