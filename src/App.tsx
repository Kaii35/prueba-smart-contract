import React, { useState } from 'react';
import { ethers } from 'ethers';
import WalletConnector from './components/WalletConnector.tsx';
import ContractInteraction from './components/ContractInteraction.tsx';
import './styles.css';

const App: React.FC = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  return (
    <div className="App">
      <h1>Smart Contract Interaction</h1>
      <WalletConnector onConnect={setProvider} />
      {provider && <ContractInteraction provider={provider} />}
    </div>
  );
};

export default App;

