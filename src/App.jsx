import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Lobby from "./components/Lobby";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import BroadDetail from "./components/BroadDetail";
function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") || "dark"
  );
  // Handle toggle event
  const handleToggle = () => {
    setIsDarkMode(isDarkMode === "dark" ? "light" : "dark");
    localStorage.setItem("theme", isDarkMode === "dark" ? "light" : "dark");
  };

  return (
    // <div
    //   className={` ${
    //     isDarkMode === "dark" ? "dark bg-[#1c1c27]" : "bg-white"
    //   } duration-300 min-h-screen`}
    // >
    //   <Navbar handleToggle={handleToggle} />
    //   <Lobby />
    // </div>
    <BrowserRouter>
      <div
        className={` ${
          isDarkMode === "dark" ? "dark bg-[#1c1c27]" : "bg-white"
        } duration-300 min-h-screen min-w-[1920px]`}
      >
        <Navbar handleToggle={handleToggle}>
          <Routes>
            <Route path="/" element={<Lobby />}></Route>
            <Route path="/:id" element={<BroadDetail />}></Route>
          </Routes>
        </Navbar>
      </div>
    </BrowserRouter>
  );
}

export default App;
