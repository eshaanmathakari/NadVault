import React from "react";
import BoxAuction from "./components/BoxAuction";
import WalletActivity from "./components/WalletActivity";
import TokenLockupForm from "./components/TokenLockupForm";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Monad Testnet DApp</h1>
      </header>
      <main>
        <BoxAuction />
        <WalletActivity />
        <TokenLockupForm />
      </main>
    </div>
  );
}

export default App;
