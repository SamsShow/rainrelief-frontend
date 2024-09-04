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
          setProvider(provider);

          const signer = await provider.getSigner();
          setSigner(signer);

          const contract = new Contract(contractAddress, abi, signer);
          setContract(contract);
          setIsConnected(true);
        } else {
          console.error("MetaMask is not installed!");
        }
      } catch (error) {
        console.error("Error initializing ethers:", error);
      }
    };

    initializeEthers();
  }, []);

  return {
    provider,
    signer,
    contract,
    isConnected,
  };
}
