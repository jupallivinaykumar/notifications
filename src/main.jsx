import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotificationPermission from "./NotificationPermission";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <>
    <NotificationPermission />
    <App />
  </>
);