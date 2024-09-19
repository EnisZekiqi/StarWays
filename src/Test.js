import { useState,useEffect } from "react";
import Cookies from 'js-cookie'; 
import { FiMoon, FiSun } from "react-icons/fi";
import { motion } from "framer-motion";
const Test = ({ updateTheme }) => {
   
  
  const TOGGLE_CLASSES =
  "text-sm font-medium flex items-center gap-2 px-1.5 lg:px-3 md:pl-3 md:pr-3.5 py-1.5 lg:py-3  transition-colors relative z-10";



  const handleThemeChange = (choosenTheme) => {
    updateTheme(choosenTheme);
  };

  const savedTheme = localStorage.getItem('color') || 'light';

 // Define styles for light and dark themes
 const styles = {
  container: {
      backgroundColor: savedTheme  === 'light' ? '#ffffff' : '#000000',
      color: savedTheme  === 'light' ? '#000000' : '#ffffff',
      padding: '20px',
      borderRadius: '5px',
  },
  button: {
      margin: '5px',
      padding: '10px',
      cursor: 'pointer',
  },
};

    return ( 
        <div>
        <div className="relative flex w-fit items-center rounded-full transition-colors"
        style={{backgroundColor:savedTheme ==='light'?'rgb(239, 240, 241)':'rgb(24, 25, 27)'}}
        >
      <button
        className={`${TOGGLE_CLASSES} ${
          savedTheme === "light" ? "#fbfbfb" : "#232629"
        }`}
        onClick={() => handleThemeChange('light')}
      >
        <FiMoon style={{color:savedTheme === "light" ? "rgb(239, 240, 241)" : "rgb(94, 102, 110)"}} className="relative z-10 text-lg md:text-sm" />
        <span style={{color:savedTheme === "light" ? "rgb(239, 240, 241)" : "rgb(94, 102, 110)"}} className="relative z-10">Light</span>
      </button>
      <button
        className={`${TOGGLE_CLASSES} ${
          savedTheme === "dark" ? "rgb(24, 25, 27)" : "rgb(94, 102, 110)"
        }`}
        onClick={() => handleThemeChange('dark')}
      >
        <FiSun style={{color:savedTheme === "dark" ? "rgb(94, 102, 110)" : ""}} className="relative z-10 text-lg md:text-sm" />
        <span style={{color:savedTheme === "dark" ? "rgb(94, 102, 110)" : ""}} className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          savedTheme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full "
          style={{backgroundColor:savedTheme === "light" ? "#5e666e" : "#d6d9dc"}}
        />
      </div>
    </div>
       
      </div>
     );
}
 
export default Test;