import dynamic from "next/dynamic";
import styles from "./Layout.module.css";
import React, { useState } from "react";

const Header = dynamic(() => import("../components/Header"), {
  // Do not import in server side
  ssr: false,
});

const Sidebar = dynamic(() => import("../components/Sidebar"), {
  // Do not import in server side
  ssr: false,
});

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");

  const toggleName = () => setName(name);
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex bg-black h-1/2">
      <div>
        <Sidebar toggleSidebar={toggleSidebar} collapsed={collapsed} />
      </div>
      <div className="w-full m-0 p-0 bg-gray relative">
        <Header collapsed={collapsed} />
        <main className={`${styles.marginTop} ml-6`} toggleName={toggleSidebar}>
          {children}
        </main>
      </div>
    </div>
  );
}
