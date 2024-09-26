"use client"

import React, { useState, useEffect } from "react";
import { useContract } from "../../hooks/useContract";
import { motion } from "framer-motion";

const Card = ({ title, icon, onClick, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`p-4 rounded-lg shadow-md cursor-pointer ${color} text-white`}
    onClick={onClick}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <div className="text-4xl">{icon}</div>
  </motion.div>
);

export default function Admin() {
  const { contract, isConnected } = useContract();
  const [activeSection, setActiveSection] = useState(null);
  const [message, setMessage] = useState("");
  
  const [newFarmer, setNewFarmer] = useState("");
  const [farmerToRemove, setFarmerToRemove] = useState("");
  const [newThreshold, setNewThreshold] = useState(0);
  const [newMaxIncentive, setNewMaxIncentive] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [fundAmount, setFundAmount] = useState(0);
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

  const sections = [
    { title: "Register Farmer", icon: "👨‍🌾", color: "bg-yellow-500", action: registerFarmer },
    { title: "Remove Farmer", icon: "🚫", color: "bg-red-500", action: removeFarmer },
    { title: "Update Threshold", icon: "🌡️", color: "bg-blue-500", action: updateThreshold },
    { title: "Update Max Incentive", icon: "💰", color: "bg-green-500", action: updateMaxIncentive },
    { title: "Distribute Incentives", icon: "🌧️", color: "bg-indigo-500", action: distributeIncentives },
    { title: "Add Funds", icon: "💵", color: "bg-purple-500", action: addFunds },
    { title: "Toggle Contract Pause", icon: "⏯️", color: "bg-gray-500", action: toggleContractPause },
    { title: "View Farmers", icon: "👥", color: "bg-orange-500", action: () => setActiveSection("View Farmers") },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Admin Panel</h1>
      
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded mb-8"
          role="alert"
        >
          <p>{message}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sections.map((section, index) => (
          <Card
            key={index}
            title={section.title}
            icon={section.icon}
            color={section.color}
            onClick={() => setActiveSection(section.title)}
          />
        ))}
      </div>

      {activeSection && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">{activeSection}</h2>
          {activeSection === "Register Farmer" && (
            <div>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newFarmer}
                onChange={(e) => setNewFarmer(e.target.value)}
                placeholder="Enter farmer address"
              />
              <button
                onClick={registerFarmer}
                className="mt-2 w-full bg-yellow-500 text-white p-2 rounded"
              >
                Register Farmer
              </button>
            </div>
          )}
          {activeSection === "Remove Farmer" && (
            <div>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={farmerToRemove}
                onChange={(e) => setFarmerToRemove(e.target.value)}
                placeholder="Enter farmer address to remove"
              />
              <button
                onClick={removeFarmer}
                className="mt-2 w-full bg-red-500 text-white p-2 rounded"
              >
                Remove Farmer
              </button>
            </div>
          )}
          {activeSection === "Update Threshold" && (
            <div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={newThreshold}
                onChange={(e) => setNewThreshold(e.target.value)}
                placeholder="Enter new rainfall threshold"
              />
              <button
                onClick={updateThreshold}
                className="mt-2 w-full bg-blue-500 text-white p-2 rounded"
              >
                Update Threshold
              </button>
            </div>
          )}
          {activeSection === "Update Max Incentive" && (
            <div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={newMaxIncentive}
                onChange={(e) => setNewMaxIncentive(e.target.value)}
                placeholder="Enter new max incentive (in ETH)"
              />
              <button
                onClick={updateMaxIncentive}
                className="mt-2 w-full bg-green-500 text-white p-2 rounded"
              >
                Update Max Incentive
              </button>
            </div>
          )}
          {activeSection === "Distribute Incentives" && (
            <div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                placeholder="Enter current rainfall"
              />
              <button
                onClick={distributeIncentives}
                className="mt-2 w-full bg-indigo-500 text-white p-2 rounded"
              >
                Distribute Incentives
              </button>
            </div>
          )}
          {activeSection === "Add Funds" && (
            <div>
              <input
                type="number"
                className="w-full p-2 border rounded"
                value={fundAmount}
                onChange={(e) => setFundAmount(e.target.value)}
                placeholder="Enter amount to add (in ETH)"
              />
              <button
                onClick={addFunds}
                className="mt-2 w-full bg-purple-500 text-white p-2 rounded"
              >
                Add Funds
              </button>
            </div>
          )}
          {activeSection === "Toggle Contract Pause" && (
            <div>
              <button
                onClick={toggleContractPause}
                className="w-full bg-gray-500 text-white p-2 rounded"
              >
                Toggle Contract Pause
              </button>
            </div>
          )}
          {activeSection === "View Farmers" && (
            <ul className="bg-gray-100 rounded-md p-4 max-h-60 overflow-y-auto">
              {farmers.map((farmer, index) => (
                <li key={index} className="text-sm text-gray-700">{farmer}</li>
              ))}
            </ul>
          )}
        </motion.div>
      )}
    </div>
  );
}