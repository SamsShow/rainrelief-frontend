"use client";

import React, { useState } from "react";
import { useContract } from "../../hooks/useContract";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Farmer Dashboard</h2>
        </div>
        <div className="p-6 space-y-6">
          {message && (
            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
              <p>{message}</p>
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="farmerAddress" className="block text-sm font-medium text-gray-700">
              Farmer Address
            </label>
            <input
              id="farmerAddress"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your farmer address"
              value={farmerAddress}
              onChange={(e) => setFarmerAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              onClick={registerFarmer}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Register as Farmer
            </button>
            <button
              onClick={withdrawIncentive}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Withdraw Incentive
            </button>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4">
          <p className="text-sm text-gray-600 text-center">
            Welcome to RainRelief. Register or withdraw your incentives here.
          </p>
        </div>
      </div>
    </div>
  );
}