import React from "react";
import { Menu } from "lucide-react";
import UserMenu from "./UserMenu";

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="w-full h-16 border-b border-gray-700">
      <div className="h-full flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1 rounded hover:bg-(--orange)"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1>This is a dashboard test blog. </h1>

        <div className="flex-1" />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
