"use client";

import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";  // Import BrowserProvider from ethers

export default function WalletButton() {
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });
    }
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum); // Use BrowserProvider
        const accounts = await provider.send("eth_requestAccounts", []);
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  return (
    <div className="flex items-center">
      <button
        id="connect-wallet-button"
        onClick={connectWallet}
        className="text-white bg-blue-500 p-2 rounded"
      >
        {walletAddress ? "Connected" : "Connect Wallet"}
      </button>
      <span id="wallet-address" className="ml-4 text-yellow-500">
        {walletAddress && `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
      </span>
    </div>
  );
}
