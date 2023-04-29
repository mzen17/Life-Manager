import { useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber'

import Box from "./Box";

interface config {
    smallScreen: boolean;
    controller: Function;
}

function Sidebar(props: config) {

    const [sidebarOn, setOpen] = useState(!props.smallScreen);

    const toggleSidebar = async () => {
        console.log(sidebarOn);
        const main = document.getElementById('main-app');
        main!.style.transition = 'transform 0.2s ease-out';
        if (!sidebarOn && !props.smallScreen) {
            main!.style.transform = 'translateX(12rem)';
        } else {
            main!.style.transform = 'translateX(0rem)';
        }
        const sidebar = document.getElementById('sidebar-content');
        sidebar!.style.transition = 'transform 0.2s ease-out';
        if (sidebarOn) {
            sidebar!.style.transform = 'translateX(-100%)';
        } else {
            sidebar!.style.transform = 'translateX(0)';
        }
        setOpen(!sidebarOn);
    }

    return (
        <div id = 'sidebar' className = {"fixed z-10" + ((sidebarOn) ? "translate-x-0 " : "translate-x-[-100%]")}>
            <div id = 'sidebar-content' className = {"border-r-2 border-green-400 w-48 min-h-[calc(100vh-4rem)] text-md flex flex-col float-left bg-black  bg-opacity-75"}>
                <Icon name={"Home"} switchTo={0} controller={props.controller}/>
                <Icon name={"Tasks"} switchTo={1} controller={props.controller}/>
                <Icon name={"Grades"} switchTo={2} controller={props.controller}/>
                <button id = 'Settings' className="absolute bottom-8 left-0 right-0 border-purple-400 text-purple-400 text-xs rounded-md mx-auto border-2 h-8 px-1 w-20 hover:text-white hover:border-white">Settings</button>
            </div>
            <div id='toggle-sidebar' className = "fixed float-left flex items-center text-white min-h-[calc(100vh-4rem)]">
                <button className="bg-transparent h-16 w-8 hover:font-bold rounded-sm text-lg" onClick={toggleSidebar}>{(sidebarOn) ? "<" : ">"}</button>
            </div>
        </div>

        
      );
}

interface IconConfig {
    name: string;
    switchTo: number;
    controller: Function;
}

const Icon = (props: IconConfig) => {
    return (
        <button className="flex items-center text-white" onClick={() => props.controller(props.switchTo)}>
        <div className = "w-16 h-16 inline-block">
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[0, 0, 0]} />
            </Canvas>
        </div>
            {props.name}
        </button>
    )
}

export default Sidebar;
