import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import SignIn from "./Components/Signin/Signin";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
