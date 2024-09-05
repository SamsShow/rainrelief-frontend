"use client";

import React, { useState } from "react";
import { useContract } from "../../hooks/useContract";
import { motion } from "framer-motion";

export default function Admin() {
  const { contract, isConnected } = useContract();
  const [newFarmer, setNewFarmer] = useState("");
  const [newThreshold, setNewThreshold] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [message, setMessage] = useState("");

  const registerFarmer = async () => {
    try {
      const tx = await contract.registerFarmer(newFarmer);
      await tx.wait();
      setMessage("Farmer registered successfully!");
    } catch (error) {
      setMessage(error.reason || "Error registering farmer.");
    }
  };

  const updateThreshold = async () => {
    try {
      const tx = await contract.updateRainfallThreshold(newThreshold);
      await tx.wait();
      setMessage("Rainfall threshold updated!");
    } catch (error) {
      setMessage(error.reason || "Error updating threshold.");
    }
  };

  const distributeIncentives = async () => {
    try {
      const tx = await contract.checkRainfallAndDistribute(rainfall);
      await tx.wait();
      setMessage("Incentives distributed!");
    } catch (error) {
      setMessage(error.reason || "Error distributing incentives.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-800 to-green-600 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="bg-green-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Admin Panel</h2>
        </div>
        <div className="p-6 space-y-6">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded"
              role="alert"
            >
              <p>{message}</p>
            </motion.div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="newFarmer" className="block text-sm font-medium text-gray-700">
                New Farmer Address
              </label>
              <input
                id="newFarmer"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={newFarmer}
                onChange={(e) => setNewFarmer(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={registerFarmer}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Register Farmer
            </motion.button>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="newThreshold" className="block text-sm font-medium text-gray-700">
                New Rainfall Threshold
              </label>
              <input
                id="newThreshold"
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={newThreshold}
                onChange={(e) => setNewThreshold(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateThreshold}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Update Threshold
            </motion.button>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700">
                Current Rainfall
              </label>
              <input
                id="rainfall"
                type="number"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={distributeIncentives}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Distribute Incentives
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}