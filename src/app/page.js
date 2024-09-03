"use client";

import React, { useState, useEffect } from "react";
import abi from "../config/abi.json";
import { contractAddress } from "../config/contractAddress.js";
import { BrowserProvider, Contract } from "ethers"; // Updated imports for ethers v6.x

export default function Home() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [rainfall, setRainfall] = useState(0);
  const [newFarmer, setNewFarmer] = useState("");
  const [newThreshold, setNewThreshold] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeEthers = async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider in v6.x
          setProvider(provider);

          const signer = await provider.getSigner();
          setSigner(signer);

          const contract = new Contract(contractAddress, abi, signer); // Use Contract from ethers
          setContract(contract);
        } else {
          console.error("MetaMask is not installed!");
        }
      } catch (error) {
        console.error("Error initializing ethers:", error);
      }
    };

    initializeEthers();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
      } catch (error) {
        console.error("Error connecting to MetaMask: ", error);
      }
    } else {
      console.error("MetaMask is not installed!");
    }
  };

  const registerFarmer = async () => {
    try {
      const tx = await contract.registerFarmer(newFarmer);
      await tx.wait();
      alert("Farmer registered successfully!");
    } catch (error) {
      console.error("Error registering farmer: ", error);
    }
  };

  const updateThreshold = async () => {
    try {
      const tx = await contract.updateRainfallThreshold(newThreshold);
      await tx.wait();
      alert("Rainfall threshold updated!");
    } catch (error) {
      console.error("Error updating threshold: ", error);
    }
  };

  const distributeIncentives = async () => {
    try {
      const tx = await contract.checkRainfallAndDistribute(rainfall);
      await tx.wait();
      alert("Incentives distributed!");
    } catch (error) {
      console.error("Error distributing incentives: ", error);
    }
  };

  const withdrawIncentive = async () => {
    try {
      const tx = await contract.withdrawIncentive();
      await tx.wait();
      alert("Incentive withdrawn!");
    } catch (error) {
      console.error("Error withdrawing incentive: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Rain Incentive DApp</h2>

        {!isConnected && (
          <button
            onClick={connectWallet}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Connect to MetaMask
          </button>
        )}

        <div>
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
        </div>

        <div>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            placeholder="New Rainfall Threshold"
            value={newThreshold}
            onChange={(e) => setNewThreshold(e.target.value)} // Added onChange handler
          />
        </div>

        <div>
          <input
            type="number"
            className="w-full p-2 border rounded text-black"
            placeholder="Current Rainfall"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)} // Added onChange handler
          />
          <button
            onClick={distributeIncentives}
            className="mt-2 w-full bg-yellow-500 text-white p-2 rounded"
          >
            Distribute Incentives
          </button>
        </div>

        <button
          onClick={withdrawIncentive}
          className="w-full bg-red-500 text-white p-2 rounded"
        >
          Withdraw Incentive
        </button>
      </div>
    </div>
  );
}
