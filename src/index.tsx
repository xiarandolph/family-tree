import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FamilyTree from "./FamilyTree";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FamilyTree />
  </React.StrictMode>
);

