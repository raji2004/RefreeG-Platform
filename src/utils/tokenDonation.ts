// services/tokenDonationService.ts
import { ethers, parseUnits } from "ethers";



// Extend the Window interface to include ethereum
declare global {
    interface Window {
        ethereum: any;
    }
}

// ERC-20 Token Contract ABI
const erc20ABI = [
    "function transfer(address to, uint256 amount) public returns (bool)"
];



const tokenAddress = "0xYourERC20TokenAddress"; // Replace with ERC-20 Token Address

export async function donateWithToken(donorAddress: string, amount: string) {
    if (!window.ethereum) {
        alert("MetaMask is required!");
        return;
    }
        
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();

        const erc20Contract = new ethers.Contract(tokenAddress, erc20ABI);

        const tx = await erc20Contract.transfer(donorAddress, parseUnits(amount, 18));
        // const tx = await erc20Contract.transfer(donorAddress, ethers.utils.parseUnits(amount, 18));
        await tx.wait();
        alert("Donation successful!");
    } catch (error) {
        console.error("Donation failed:", error);
    }
}   
