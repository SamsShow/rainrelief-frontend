"use client";

import React, { useState, useEffect } from "react";
import { useContract } from "../../hooks/useContract";
import Link from 'next/link';

export default function Home() {
  const { contract, isConnected, connectWallet } = useContract();
  const [farmerAddress, setFarmerAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [incentiveBalance, setIncentiveBalance] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Farmer Dashboard</h2>
        </div>
        <div className="p-6 space-y-6">
          {message && (
            <div className={`border-l-4 p-4 rounded ${
              message.includes("successfully") 
                ? "bg-green-100 border-green-500 text-green-700"
                : "bg-red-100 border-red-500 text-red-700"
            }`} role="alert">
              <p>{message}</p>
            </div>
          )}
          {!isConnected && (
            <button
              onClick={connectWallet}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Connect Wallet
            </button>
          )}
          {isConnected && (
            <>
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
                <Link href="https://forms.gle/2G2CXULW4VC6EhjC8"
                  target="_blank"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 text-center"
                >
                  Register as Farmer
                </Link>

                <button
                  onClick={withdrawIncentive}
                  disabled={isPaused || isLoading}
                  className={`w-full font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                    isPaused
                      ? "bg-gray-400 cursor-not-allowed"
                      : isLoading
                      ? "bg-blue-300 cursor-wait"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isLoading ? "Processing..." : isPaused ? "Withdrawals Paused" : "Withdraw Incentive"}
                </button>

                <button
                  onClick={checkRegistrationStatus}
                  disabled={!contract || !farmerAddress}
                  className={`w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                    !contract || !farmerAddress ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Check Registration Status
                </button>

                <button
                  onClick={fetchIncentiveBalance}
                  disabled={!contract || !farmerAddress}
                  className={`w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                    !contract || !farmerAddress ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Fetch Incentive Balance
                </button>

                <button
                  onClick={checkContractPauseStatus}
                  disabled={!contract}
                  className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 ${
                    !contract ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Check Contract Pause Status
                </button>
              </div>
            </>
          )}
        </div>
        <div className="bg-gray-100 px-6 py-4">
          <p className="text-sm text-gray-600 text-center">
            Welcome to RainRelief. {isPaused ? "Note: Contract is currently paused." : "Register or withdraw your incentives here."}
          </p>
        </div>
      </div>
    </div>
  );
}
