import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/clerk-react";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen scroll-hidden">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-200 w-full px-8 h-14 flex-shrink-0">
        <div
          className="flex items-center gap-0 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="logo"
            className="w-10 sm:w-15"
          />
          <h2 className="text-xl sm:text-2xl font-semibold text-primary">
            Nexon.ai
          </h2>
        </div>
        {sidebar ? (
          <X
            className="w-6 h-6 text-gray-600 sm:hidden ml-1"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <Menu
            className="w-6 h-6 text-gray-600 sm:hidden ml-1"
            onClick={() => setSidebar(true)}
          />
        )}
      </nav>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;
