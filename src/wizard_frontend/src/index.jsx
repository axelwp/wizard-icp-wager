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
  <Router>
    <App />
  </Router>
);
/*
render(
  <BrowserRouter>
    <Routes>
        <Route index element={<Landing />} />
        <Route path="game" element={<Game />}/>
        <Route path="*" element={<NotFound />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);*/