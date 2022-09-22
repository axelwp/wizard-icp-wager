import * as React from "react";
import {createRoot} from "react-dom/client";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from 'web3'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation } from "react-router-dom";
import App from "./pages/App";
import NotFound from "./pages/NotFound";

function getLibrary(provider) {
  return new Web3Provider(provider);
}

const root = createRoot(document.getElementById('root'));
root.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
);
