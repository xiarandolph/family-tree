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
    <div className={right ? "Right" : ""}>
      <div className={`Overlay Sidebar ${open ? "Sidebar-open": ""}`}>
        <div className="Sidebar-header">
          <span> {name} </span>
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;