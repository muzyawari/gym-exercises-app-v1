import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { DashboardProvider } from "./contexts/DashboardContext";
import { WorkoutsProvider } from "./contexts/WorkoutsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DashboardProvider>
      <WorkoutsProvider>
        <App />
      </WorkoutsProvider>
    </DashboardProvider>
  </BrowserRouter>
);
