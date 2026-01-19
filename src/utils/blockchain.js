import { ethers } from "ethers";
import contractData from "./contract-abi.json"; 

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const abi = contractData.abi ? contractData.abi : contractData;

// TASK 1: Fungsi untuk Membaca (Read)
export const getStoredValue = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    
    const val = await contract.getValue();
    return val.toString(); // Ubah BigInt ke String agar bisa tampil di UI
};

// TASK 2: Fungsi untuk Menulis (Update State)
export const updateStoredValue = async (newValue) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // Butuh izin wallet
    const contract = new ethers.Contract(contractAddress, abi, signer);
    
    const tx = await contract.setValue(newValue);
    await tx.wait(); // Tunggu sampai masuk blockchain
    return tx.hash;
};