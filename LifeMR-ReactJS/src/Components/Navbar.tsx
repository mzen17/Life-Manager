import React, { useState, useEffect } from "react";
import lmLogo from '/LM.svg'
import { useMediaQuery } from '@react-hook/media-query';

// Props for configuration
interface configuration{
  LoggedIn: boolean // Front Display Message
  username: string
  controller: Function
}

function NavBar(props: configuration) {
  // Settings for bar
  const isSmallScreen = useMediaQuery('(max-width: 640px)');
  const [opened, setOpen] = useState(!isSmallScreen);

  // Redirect to login bar
  const login = () => {
    props.controller(0);
  }

   // Redirect to login bar
  const signup = () => {
    props.controller(1);
  }

  // Delete tokens and refresh (logout)
  const logout = () => {
    document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    location.reload();
  }

  // Toggle drop down option
  const toggleDropdown = () => {
    setOpen(!opened);
  };

  // Navbar
  return (
    <div id="navbar" className="bg-black text-white flex bg-opacity-40 w-full h-16">
      {/* Branding and logo area */}
      <div id="brandbox" className="flex p-3 items-center pl-6 pr-6">
          <img src = {lmLogo} id='logo' alt='logo' className="opacity-100 inline w-8 mr-2"></img>
          <div className="text-green-500 opacity-100">LifeMR</div>
      </div>

      {/* Small screen render */}
      {isSmallScreen && (
        <div className= "group inline-block my-auto ml-auto">
        <Button id={'login_box'} func={toggleDropdown} text={"Dropdown"} extras={"mr-4 w-20 border-green-500 text-green-500 items-center text-center text-xs mx-auto justify-center"} />
        
        <div className={opened ? "absolute text-xs pt-1 w-20 block" : "hidden"}>
          <Button id={'login_button'} func={login} text={"Login"} extras={(props.LoggedIn) ? "hidden" : "border-green-400 text-green-400 w-full mr-4"} />
          <Button id={'logout_button'} func={props.LoggedIn ? logout : signup} text={"Logout"} extras={"border-green-200 text-green-200 w-full"} />
        </div>
      </div>
      )}
  
      {/* Desktop render */}
      {!isSmallScreen && (
          <div id='login_box' className="flex items-center justify-center text-xs ml-auto pr-16">
                <Button id={'login_button'} func={login} text={"Login"} extras={(props.LoggedIn) ? "hidden" : "border-green-400 text-green-400 w-20 mr-4"} />
                <Button id={'logout_button'} func={props.LoggedIn ? logout : signup} text={props.LoggedIn ? "Logout" : "Sign Up"} extras={"border-green-200 text-green-200 w-20"} />
          </div>
      )}
    </div>
  );
}

// Button configuration
interface ButtonConf {
  text: string
  func: () => void
  id: string;
  extras: string;
}

// Button component
function Button(config: ButtonConf) {
  return (
    <button id = {config.id} className={"rounded-xl border-2 h-8 px-1 hover:text-white hover:border-white " + config.extras} onClick={config.func}>{config.text}</button>
  );
}

export default NavBar;
