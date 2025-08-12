import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <div className="fixed z-50 w-full backdrop-blur-xl flex justify-between items-center py-2 px-4 sm:px-20 xl:px-32">
            <div
                className="flex items-center gap-0 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src={assets.logo} alt="logo" className="w-10 sm:w-15" />
                <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                    Nexon.ai
                </h2>
            </div>

            {user ? (
                <UserButton />
            ) : (
                <button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5">
                    Get Started <ArrowRight className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default Navbar;
