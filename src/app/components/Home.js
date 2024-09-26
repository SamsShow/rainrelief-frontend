"use client";

import React, { useState, useEffect } from "react";
import { useContract } from "../../hooks/useContract";
import Link from 'next/link';
import { ArrowLeft, DollarSign, UserCheck, BarChart2, PauseCircle } from 'lucide-react';

const CategoryButton = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm ${
      isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-600'
    } hover:bg-gray-100 transition-colors`}
  >
    {children}
  </button>
);

const ActionCard = ({ title, icon, onClick, color }) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-2xl text-left transition-transform hover:scale-105 ${color}`}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      {icon}
    </div>
  </button>
);

export default function FarmerDashboard() {
  const { contract, isConnected, connectWallet } = useContract();
  const [farmerAddress, setFarmerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [incentiveBalance, setIncentiveBalance] = useState(0);
  const [activeCategory, setActiveCategory] = useState("actions");

  useEffect(() => {
    if (contract && farmerAddress) {
      checkRegistrationStatus();
      fetchIncentiveBalance();
      checkContractPauseStatus();
    }
  }, [contract, farmerAddress]);

  const checkRegistrationStatus = async () => {
    console.log("Checking registration status...");
    if (!contract || !farmerAddress) {
      setMessage("Contract or Farmer Address is not available.");
      return;
    }
    try {
      const status = await contract.registeredFarmers(farmerAddress);
      setIsRegistered(status);
      setMessage(`Registration status: ${status}`);
    } catch (error) {
      console.error("Error checking registration status:", error);
      setMessage("Error checking registration status.");
    }
  };

  const fetchIncentiveBalance = async () => {
    console.log("Fetching incentive balance...");
    if (!contract || !farmerAddress) {
      setMessage("Contract or Farmer Address is not available.");
      return;
    }
    try {
      const balance = await contract.incentives(farmerAddress);
      setIncentiveBalance(balance.toString());
      setMessage(`Incentive balance: ${balance.toString()}`);
    } catch (error) {
      console.error("Error fetching incentive balance:", error);
      setMessage("Error fetching incentive balance.");
    }
  };

  const checkContractPauseStatus = async () => {
    console.log("Checking contract pause status...");
    if (!contract) {
      setMessage("Contract is not available.");
      return;
    }
    try {
      const paused = await contract.paused();
      setIsPaused(paused);
      setMessage(`Contract pause status: ${paused}`);
    } catch (error) {
      console.error("Error checking contract pause status:", error);
      setMessage("Error checking contract pause status.");
    }
  };

  const withdrawIncentive = async () => {
    try {
      if (isPaused) {
        setMessage("Contract is currently paused. Withdrawals are not allowed.");
        return;
      }
      const tx = await contract.withdrawIncentive();
      await tx.wait();
      setMessage("Incentive withdrawn successfully!");
      fetchIncentiveBalance();
    } catch (error) {
      setMessage(error.reason || "Error withdrawing incentive.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 rounded-lg p-9">
      <div className="max-w-2xl mx-auto pt-5">
        <header className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-black ">Farmer Dashboard</h1>
        </header>

        {/* <div className="flex space-x-2 mb-6 overflow-x-auto">
          <CategoryButton 
            isActive={activeCategory === "actions"} 
            onClick={() => setActiveCategory("actions")}
          >
            Actions
          </CategoryButton>
          <CategoryButton 
            isActive={activeCategory === "status"} 
            onClick={() => setActiveCategory("status")}
          >
            Status
          </CategoryButton>
          <CategoryButton 
            isActive={activeCategory === "balance"} 
            onClick={() => setActiveCategory("balance")}
          >
            Balance
          </CategoryButton>
        </div> */}

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${
            message.includes("successfully") 
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            <p>{message}</p>
          </div>
        )}

        {!isConnected ? (
          <ActionCard
            title="Connect Wallet"
            icon={<DollarSign className="w-6 h-6 text-white" />}
            onClick={connectWallet}
            color="bg-blue-500"
          />
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-black"
              placeholder="Enter your farmer address"
              value={farmerAddress}
              onChange={(e) => setFarmerAddress(e.target.value)}
            />
            
            <ActionCard
              title="Register as Farmer"
              icon={<UserCheck className="w-6 h-6 text-white" />}
              onClick={() => window.open("https://forms.gle/2G2CXULW4VC6EhjC8", "_blank")}
              color="bg-green-500"
            />

            <ActionCard
              title="Withdraw Incentive"
              icon={<DollarSign className="w-6 h-6 text-white" />}
              onClick={withdrawIncentive}
              color={isPaused ? "bg-gray-400" : "bg-blue-500"}
            />

            <ActionCard
              title="Check Registration"
              icon={<UserCheck className="w-6 h-6 text-white" />}
              onClick={checkRegistrationStatus}
              color="bg-yellow-500"
            />

            <ActionCard
              title="Fetch Balance"
              icon={<BarChart2 className="w-6 h-6 text-white" />}
              onClick={fetchIncentiveBalance}
              color="bg-purple-500"
            />

            <ActionCard
              title="Check Contract Status"
              icon={<PauseCircle className="w-6 h-6 text-white" />}
              onClick={checkContractPauseStatus}
              color="bg-red-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}
