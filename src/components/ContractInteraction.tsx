import React, { useState } from 'react';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xFF7122CC8858C3eC8446c10c554216df6BA7937F';
const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'string', name: '_textToUse', type: 'string' }],
    name: 'updateTextToUse',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTextToUse',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];

const ContractInteraction: React.FC<{ provider: ethers.providers.Web3Provider | null }> = ({ provider }) => {
  const [currentText, setCurrentText] = useState<string>('');
  const [newText, setNewText] = useState<string>('');

  const readContract = async () => {
    if (provider) {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const text = await contract.getTextToUse();
      setCurrentText(text);
    }
  };

  const writeContract = async () => {
    if (provider) {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      try {
        const tx = await contract.updateTextToUse(newText);
        await tx.wait();
        alert('Text updated!');
      } catch (error) {
        console.error('Transaction error:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={readContract}>Read Text</button>
      <p>Current Text: {currentText}</p>
      <input
        type="text"
        placeholder="New Text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <button onClick={writeContract}>Update Text</button>
    </div>
  );
};

export default ContractInteraction;

