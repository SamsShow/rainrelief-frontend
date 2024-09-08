import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import abi from "../config/abi.json";
import { contractAddress } from "../config/contractAddress.js";

export function useContract() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeEthers = async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const accounts = await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contractInstance = new Contract(contractAddress, abi, signer);

          setProvider(provider);
          setSigner(signer);
          setContract(contractInstance);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Error initializing ethers:", error);
      }
    };
    initializeEthers();
  }, []);

  const fetchAllFarmers = async () => {
    if (contract) {
      try {
        const farmerList = await contract.getAllFarmers();
        return farmerList;
      } catch (error) {
        console.error("Error fetching farmers:", error);
        throw error;
      }
    }
    return [];
  };

  return {
    provider,
    signer,
    contract,
    isConnected,
    fetchAllFarmers,
  };
}
