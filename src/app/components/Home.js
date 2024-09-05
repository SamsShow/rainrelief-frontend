"use client";

import React, { useState } from "react";
import { useContract } from "../../hooks/useContract"; // Custom hook for contract logic

export default function Home() {
  const { contract, isConnected } = useContract();
  const [farmerAddress, setFarmerAddress] = useState("");
  const [message, setMessage] = useState("");

  const withdrawIncentive = async () => {
    try {
      const tx = await contract.withdrawIncentive();
      await tx.wait();
      setMessage("Incentive withdrawn successfully!");
    } catch (error) {
      setMessage(error.reason || "Error withdrawing incentive.");
    }
  };

  const registerFarmer = async () => {
    try {
      const response = await fetch('/api/register-farmer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: farmerAddress }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error submitting registration request.");
      }
    } catch (error) {
      setMessage("Error submitting registration request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white">Farmer Dashboard</h2>
        <p className="text-center text-white">{message}</p>

        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          placeholder="Farmer Address"
          value={farmerAddress}
          onChange={(e) => setFarmerAddress(e.target.value)}
        />
        <button
          onClick={registerFarmer}
          className="mt-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
        >
          Register as Farmer
        </button>
        <button
          onClick={withdrawIncentive}
          className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
        >
          Withdraw Incentive
        </button>
      </div>
    </div>
  );
}