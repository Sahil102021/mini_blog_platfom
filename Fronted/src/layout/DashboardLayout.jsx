import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AuthGuard from "../auth/AuthGuard";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="h-screen flex bg-(--white)">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 lg:ml-64 relative overflow-x-hidden ">

          <div className="fixed top-0 left-0 right-0 lg:left-64 h-16 z-40">
            <Header setSidebarOpen={setSidebarOpen} />
          </div>

          <main className="mt-16 flex-1 overflow-y-auto p-3">
            {children}
          </main>

        </div>
      </div>
    </AuthGuard>
  );
};

export default DashboardLayout;