import React, { useState } from "react";
import "./Sidebar.css";

export interface SidebarProps {
  open: boolean;
  name: string;
  right?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

function Sidebar({open, name, right, onClose, children}: SidebarProps) {
  return (
    <div className={`Overlay Sidebar ${open ? "Sidebar-open": ""} ${right ? "Right" : ""}`}>
      <div className={`Sidebar-header ${right ? "Right" : ""}`}>
        <span> {name} </span>
        <button onClick={onClose}>X</button>
      </div>
      {children}
    </div>
  );
}

export default Sidebar;