import React, { useState, useEffect } from "react";
import { useMediaQuery } from '@react-hook/media-query';


function Sidebar() {

    const isSmallScreen = useMediaQuery('(max-width: 640px)');
    const [sidebarOn, setOpen] = useState(!isSmallScreen);

    const toggleSidebar = () => {
        setOpen(!sidebarOn);
    }

    return (
        <div id = 'sidebar'>
            <div id = 'sidebar-content' className = {(sidebarOn) ? ((!isSmallScreen) ? "w-48 min-h-[calc(100vh-4rem)] text-md flex flex-col float-left justify-between bg-black bg-opacity-75 text-white" : "w-48 min-h-[calc(100vh-4rem)] text-md flex flex-col float-left justify-between bg-black bg-opacity-75 text-white fixed") : "hidden"}>
                <ul className= "w-full">
                    <li><button className="w-full py-2 text-purple-100 hover:text-white">Dashboard</button></li>
                    <li><button className="w-full py-2 text-purple-100 hover:text-white">Planner</button></li>
                    <li><button className="w-full py-2 text-purple-100 hover:text-white">Calendar</button></li>
                    <li><button className="w-full py-2 text-purple-100 hover:text-white">Grades</button></li>
                </ul>
                <div className="w-full h-full flex pb-8"><button id = 'Settings' className="border-purple-400 text-purple-400 text-xs rounded-md mx-auto border-2 h-8 px-1 w-20 hover:text-white hover:border-white">Settings</button></div>
            </div>
            <div id='toggle-sidebar' className = "fixed float-left flex text-white items-center min-h-[calc(100vh-4rem)]">
                <button className="bg-black h-16 w-8 hover:bg-green-100 rounded-sm" onClick={toggleSidebar}>{(sidebarOn) ? "<" : ">"}</button>
            </div>
        </div>
      );
}
export default Sidebar;
