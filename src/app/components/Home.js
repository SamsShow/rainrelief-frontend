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

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-zinc-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Farmer Dashboard</h2>
        <p className="text-center text-white">{message}</p>

        <input
          type="text"
          className="w-full p-2 border rounded text-black"
          placeholder="Farmer Address"
          value={farmerAddress}
          onChange={(e) => setFarmerAddress(e.target.value)}
        />
        <button
          onClick={withdrawIncentive}
          className="mt-2 w-full bg-red-500 text-white p-2 rounded"
        >
          Withdraw Incentive
        </button>
      </div>
    </div>
  );
}
