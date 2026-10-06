import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Master = () => {
     const [isSidebarOpen, setSidebarOpen] = useState(false);

    /**
     * to open the sidebar
     */
    const handleSidebarToggle = () => {
        setSidebarOpen(true);
    };

    /**
     * to close sidebar
     */
    const handleCloseSidebar = () => {
        setSidebarOpen(false)
    }
  return (
    <div className="min-h-screen bg-main-bg text-main-text transition-colors duration-300">
      <Header handleSidebarToggle={handleSidebarToggle}/>
      {/* send props to sidebar  */}
            <Sidebar isSidebarOpen={isSidebarOpen} onCloseSidebar={handleCloseSidebar} />
      <div className="container mx-auto">
        {/* <Navbar /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Master;
