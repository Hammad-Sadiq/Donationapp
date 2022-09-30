import React  from 'react';
import './App.css';
import RouterComponent from "./components/navigation/router.js";
import { Context, Provider } from "./components/globalContext/globalContext";

import { MoralisProvider } from "react-moralis";

function App() {
  return (
    <MoralisProvider appId="2LEjtf3CKKYDo7XDI7cbuSflxzaLkyRNfLpebHXI" serverUrl="https://kskreoe1kecg.usemoralis.com:2053/server">
    <Provider>
    <div className="outer">
    <RouterComponent />
    </div>

    </Provider>
    </MoralisProvider>
  );
}

export default App;