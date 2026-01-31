import React from "react";
import { NavLink } from "react-router";
import { X, Home, FileText, Shield } from "lucide-react";
import Button from "./ul/Button";
import { logout } from "../auth/useAuth";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { label: "Blog", icon: Home, path: "/" },
    { label: "Blog Management", icon: FileText, path: "/blogmanagement" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-(--white) border-r
        z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <span className="font-bold text-lg">Dashboard</span>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition
                  ${
                    isActive
                      ? "bg-(--orange) text-(--blue)"
                      : "text-(--blue) hover:bg-(--orange)"
                  }`
                }
              >
                <Icon className="w-5 h-5 text-(--blue) " />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
