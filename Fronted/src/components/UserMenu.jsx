import React, { useEffect, useState } from "react";
import { ChevronDown, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import { getToken, logout } from "../auth/useAuth";
import axios from "axios";

const UserMenu = () => {
  let token = getToken();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [userMenuOpen]);

  return (
    <div className="flex items-center gap-4 ml-6">
      <div className="relative">
        <button
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-(--orange) transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-(--blue) flex items-center justify-center">
            <span className="text-white font-semibold text-sm">B</span>
          </div>

          <div className="text-left hidden md:block">
            <p className="text-sm font-medium  ">{user?.user?.username}</p>
            <p className="text-xs ">Admin</p>
          </div>

          <ChevronDown className="w-4 h-4" />
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-xl border bg-(--white) border-gray-700 py-2 z-50">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm font-medium">{user.user.username}</p>
              <p className="text-xs text-gray-400">{user.user.email}</p>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-(--gray) transition">
              <Users className="w-4 h-4" />
              My Profile
            </button>

            <div className="border-t border-gray-700 pt-2">
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
