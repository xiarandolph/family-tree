import React, { useState } from "react";
import "./Sidebar.css";

export interface SidebarProps {
  name: string;
  right?: boolean;
  children: React.ReactNode;
}

function Sidebar({name, right, children}: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={right ? "Right" : ""}>
      <button className="Overlay" onClick={() => setOpen(true)} style={{margin: "10px"}}> {name} </button>
      <div className={`Overlay Sidebar ${open ? "Sidebar-open": ""}`}>
        <div className="Sidebar-header">
          <span> {name} </span>
          <button onClick={() => setOpen(false)}>X</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Sidebar;