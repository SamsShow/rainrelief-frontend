"use client";

import React, { useState, useEffect } from "react";
import { useContract } from "../../hooks/useContract";
import { motion } from "framer-motion";
// import { ethers } from "ethers";

export default function Admin() {
  const { contract, isConnected } = useContract();
  const [newFarmer, setNewFarmer] = useState("");
  const [farmerToRemove, setFarmerToRemove] = useState("");
  const [newThreshold, setNewThreshold] = useState(0);
  const [newMaxIncentive, setNewMaxIncentive] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [fundAmount, setFundAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    if (contract) {
      fetchAllFarmers();
    }
  }, [contract]);

  const registerFarmer = async () => {
    try {
      const tx = await contract.registerFarmer(newFarmer);
      await tx.wait();
      setMessage("Farmer registered successfully!");
      fetchAllFarmers();
    } catch (error) {
      setMessage(error.reason || "Error registering farmer.");
    }
  };

  const removeFarmer = async () => {
    try {
      const tx = await contract.removeFarmer(farmerToRemove);
      await tx.wait();
      setMessage("Farmer removed successfully!");
      fetchAllFarmers();
    } catch (error) {
      setMessage(error.reason || "Error removing farmer.");
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

  const updateMaxIncentive = async () => {
    try {
      const tx = await contract.updateMaxIncentive(ethers.utils.parseEther(newMaxIncentive.toString()));
      await tx.wait();
      setMessage("Max incentive updated successfully!");
    } catch (error) {
      setMessage(error.reason || "Error updating max incentive.");
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

  const addFunds = async () => {
    try {
      const tx = await contract.addFunds({ value: ethers.utils.parseEther(fundAmount.toString()) });
      await tx.wait();
      setMessage("Funds added successfully!");
    } catch (error) {
      setMessage(error.reason || "Error adding funds.");
    }
  };

  const toggleContractPause = async () => {
    try {
      const tx = await contract.togglePause();
      await tx.wait();
      setMessage("Contract pause status toggled successfully!");
    } catch (error) {
      setMessage(error.reason || "Error toggling contract pause status.");
    }
  };

  const fetchAllFarmers = async () => {
    try {
      const farmerList = await contract.getAllFarmers();
      setFarmers(farmerList);
    } catch (error) {
      setMessage("Error fetching farmers list.");
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
        className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="bg-green-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Admin Panel</h2>
        </div>
        <div className="p-6 space-y-6 text-black">
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
          
          <div className="space-y-4 text-black">
            <h3 className="text-xl font-semibold">Farmer Management</h3>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={registerFarmer}
                className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Register Farmer
              </motion.button>
            </div>
            <div>
              <label htmlFor="farmerToRemove" className="block text-sm font-medium text-gray-700">
                Farmer Address to Remove
              </label>
              <input
                id="farmerToRemove"
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={farmerToRemove}
                onChange={(e) => setFarmerToRemove(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={removeFarmer}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Remove Farmer
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contract Management</h3>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={updateThreshold}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Update Threshold
              </motion.button>
            </div>
            <div>
              <label htmlFor="newMaxIncentive" className="block text-sm font-medium text-gray-700">
                New Max Incentive (in ETH)
              </label>
              <input
                id="newMaxIncentive"
                type="number"
                step="0.01"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={newMaxIncentive}
                onChange={(e) => setNewMaxIncentive(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={updateMaxIncentive}
                className="mt-2 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Update Max Incentive
              </motion.button>
            </div>
            <div>
              <label htmlFor="fundAmount" className="block text-sm font-medium text-gray-700">
                Add Funds (in ETH)
              </label>
              <input
                id="fundAmount"
                type="number"
                step="0.01"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addFunds}
                className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Add Funds
              </motion.button>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleContractPause}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
            >
              Toggle Contract Pause
            </motion.button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Incentive Distribution</h3>
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={distributeIncentives}
                className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Distribute Incentives
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Registered Farmers</h3>
            <ul className="bg-gray-100 rounded-md p-4 max-h-40 overflow-y-auto">
              {farmers.map((farmer, index) => (
                <li key={index} className="text-sm text-gray-700">{farmer}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}