"use client";

import React, { useState } from "react";
import { useContract } from "../../hooks/useContract"; // Custom hook to reuse contract logic
import { ethers } from "ethers";

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
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
        <p className="text-center text-white">{message}</p>

        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          placeholder="Farmer Address"
          value={newFarmer}
          onChange={(e) => setNewFarmer(e.target.value)}
        />
        <button
          onClick={registerFarmer}
          className="mt-2 w-full bg-blue-500 text-zinc-900 p-2 rounded"
        >
          Register Farmer
        </button>

        <input
          type="number"
          className="w-full p-2 border rounded text-black"
          placeholder="New Rainfall Threshold"
          value={newThreshold}
          onChange={(e) => setNewThreshold(e.target.value)}
        />

        <input
          type="number"
          className="w-full p-2 border rounded text-black"
          placeholder="Current Rainfall"
          value={rainfall}
          onChange={(e) => setRainfall(e.target.value)}
        />
        <button
          onClick={distributeIncentives}
          className="mt-2 w-full bg-yellow-500 text-white p-2 rounded"
        >
          Distribute Incentives
        </button>
      </div>
    </div>
  );
}
