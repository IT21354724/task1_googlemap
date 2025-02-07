import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 right-0 p-4 bg-blue-100 w-full flex justify-end">
      <button
        onClick={() => navigate("/signup")}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 cursor-pointer"
      >
        Sign Up
      </button>
      <button
        onClick={() => navigate("/signin")}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer"
      >
        Sign In
      </button>
    </div>
  );
};

export default Navbar;
