import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider } from '@privy-io/react-auth';
import { PRIVY_CONFIG } from './utils/PrivyConfig';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Check if the environment variable is being loaded correctly
console.log('Privy App ID:', process.env.REACT_APP_PRIVY_APP_ID);
console.log('PRIVY_CONFIG.appId:', PRIVY_CONFIG.appId);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PrivyProvider
        appId="cm87p4kbi034zfp9n44cb8e1k"
        config={{
          loginMethods: PRIVY_CONFIG.loginMethods,
          appearance: PRIVY_CONFIG.appearance,
          embeddedWallets: PRIVY_CONFIG.embeddedWallets,
        }}
      >
        <App />
      </PrivyProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
