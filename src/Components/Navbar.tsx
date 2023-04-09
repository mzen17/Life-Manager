import React, { useState, useEffect } from "react";
import lmLogo from '/LM.svg'
import { useMediaQuery } from '@react-hook/media-query';

function SideBar(props: Record<string, any>) {
  
  const [time, setTime] = useState(new Date());
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const [opened, setOpen] = useState(!isSmallScreen);

  const toggleDropdown = () => {
    setOpen(!opened);
  };

  useEffect(() => {
          const intervalId = setInterval(() => {
            setTime(new Date());
          }, 1000);
      
          return () => clearInterval(intervalId);
        }, []);

      return (
        <div id="navbar" className="bg-black text-white flex bg-opacity-40 w-full h-16">
          <div id="brandbox" className="flex p-3 items-center pl-6 pr-6">
              <img src = {lmLogo} id='logo' alt='logo' className="opacity-100 inline w-8 mr-2"></img>
              <div className="text-green-500 opacity-100">LifeMR</div>
          </div>


          <h2 id='time' className="my-auto text-sm">{time.toLocaleTimeString()}</h2>

          <div id='login_box' className={isSmallScreen ? "hidden" : "flex justify-center text-xs ml-auto pr-4"}>
            <button id = 'login_button' className="border-green-400 text-green-400 rounded-md my-auto border-2 h-8 px-1 w-20 mr-4 hover:text-white hover:border-white">Login</button>
            <button id = 'logout_button' className="border-green-200 text-green-200 rounded-md my-auto border-2 h-8 px-1 w-20 hover:text-white hover:border-white">Logout</button>
          </div>


          <div className= {isSmallScreen ? "group inline-block my-auto ml-auto" : "hidden"}>
            <button className="rounded-md border-2 h-8 px-1 w-24 mr-4 border-green-500 text-green-500 items-center text-center text-xs mx-auto justify-center" onClick={toggleDropdown}>Dropdown</button>

            <ul className={opened ? "absolute text-xs pt-1 w-24 block" : "hidden"}>
              <li className="w-full">
                <button className="border-green-400 text-green-400 rounded-md my-auto border-2 h-8 px-1 w-full">Login</button>
              </li>
              <li className="">
                <button className="border-green-200 text-green-200 rounded-md my-auto border-2 h-8 px-1 w-full">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      );
}
export default SideBar;
