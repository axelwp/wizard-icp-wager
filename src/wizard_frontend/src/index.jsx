import * as React from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useLocation } from "react-router-dom";
import App from "./pages/App";
import NotFound from "./pages/NotFound";


const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);
