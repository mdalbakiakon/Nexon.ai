import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { Star } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const handleCreateNowClick = () => {
    if (isSignedIn) {
      navigate("/ai");
    } else {
      openSignIn();
    }
  };

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center 
      bg-[linear-gradient(to_bottom,transparent_75%,white_100%),url(/gradientBackground.png)] 
      bg-cover bg-no-repeat min-h-screen"
    >
      <div className="text-center mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl text-primary leading-[1] font-bold">
          Generate Your Utilities <br />
          with Nexon
        </h1>
        <p className="mt-8 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto text-gray-600 text-sm sm:text-[1rem] md:text-xl">
          Transform your ideas into reality with suite of premium AI tools.
          Write articles, generate images and what not you name it.
        </p>
      </div>

      <div className="mt-8 lg:mt-12 flex justify-center gap-2 sm:gap-4 text-[1rem] sm:text-lg md:text-xl">
        <button
          onClick={handleCreateNowClick}
          className="bg-primary shadow-lg text-white py-2 px-6 md:py-3 md:px-8 lg:py-3 lg:px-10 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer"
        >
          {isSignedIn ? "Dashboard" : "Create now"}
        </button>
        <button className="bg-transparent text-primary py-2 px-6 md:py-3 md:px-8 lg:py-3 lg:px-10 rounded-lg border-gray-100 shadow-lg hover:scale-102 active:scale-95 transition cursor-pointer">
          Watch demo
        </button>
      </div>

      <div className="mt-15 flex items-center divide-x divide-gray-300 mx-auto scale-[0.75]">
        <div className="flex -space-x-3 pr-3">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
            alt="image"
            className="w-10 h-10 rounded-full hover:-translate-y-1 transition z-1"
          />
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
            alt="image"
            className="w-10 h-10 rounded-full hover:-translate-y-1 transition z-[2]"
          />
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop"
            alt="image"
            className="w-10 h-10 rounded-full hover:-translate-y-1 transition z-[3]"
          />
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="image"
            className="w-10 h-10 rounded-full hover:-translate-y-1 transition z-[4]"
          />
        </div>
        <div className="pl-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 text-primary"
            fill="currentColor"
            stroke="currentColor"
          />
        ))}
        <p className="text-gray-600 font-medium ml-2">5.0</p>
      </div>
      <p className="text-sm text-gray-500">
        Trusted by <span className="font-medium text-gray-600">100,000+</span> users
      </p>
    </div>
      </div>
    </div>
  );
};

export default Hero;
