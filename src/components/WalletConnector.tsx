import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletConnector: React.FC<{ onConnect: (provider: ethers.providers.Web3Provider) => void }> = ({ onConnect }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any); // Cast to `any`
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        onConnect(provider);
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('Metamask is not installed.');
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && <p>Connected: {walletAddress}</p>}
    </div>
  );
};

export default WalletConnector;

