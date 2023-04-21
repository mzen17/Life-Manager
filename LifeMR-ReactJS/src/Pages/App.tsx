import { useState, useEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query';

import SubApp from "./subapps";
import NavBar from "../Components/Navbar";
import LoginMenu from '../Components/LoginMenu';


function App() {
  // Manage screen size
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // Panel manager (None, Login, Sign Up, Settings)
  const [topscreen, setTop] = useState(-1);
  const [panel, setPanel] = useState(0);

  // Get username from cookies
  const user = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=")[1];

  // Get session token from cookies
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

  // Cookie manager
  const [cookieLogged, setCookieLogged] = useState(false);

  // When mounted, check cookie
  useEffect(() => {
    async function fetchData() {
      const menu = document.getElementById('menu');
      if (token != null && token !== "" && user !== null && user !== "" && cookieLogged === false) {
        console.log(token, user);
        const data = {
          username: user,
          password: token,
        };
  
        // set up the request options
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(data),
        };
  
        // authenticate the token
        const response = await fetch(
          `http://${'localhost:' + 7000}/validatetoken/`,
          requestOptions
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setCookieLogged(jsonData.status);
      }
    }
    
    fetchData();
  }, [token, user, cookieLogged]);

  // Slide and adjust top depending on status
  const vanishTop = async (id: number) => {
    console.log("Switching to:" + id);
    if(id >= -1 && id <= 2) {
      const menu = document.getElementById('menu');
      menu!.style.transition = 'transform 0.5s ease-out';
      if (id != -1) {
        menu!.style.transform = 'translateY(-4rem)';
      } else {
        menu!.style.transform = 'translateY(-120%)';
      }
      setTop(id);
    }
  }

  // Hotkey bindings for website
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || (event.key === 'x' && (event.target! as HTMLElement).tagName !== 'INPUT')) {
      if(topscreen != -1) {
        vanishTop(-1);
      }
    }
    if (event.key === 'l' && (event.target! as HTMLElement).tagName !== 'INPUT') {
      if(topscreen != 1) {
        vanishTop(0);
      }
    }
    if (event.key === 's' && (event.target! as HTMLElement).tagName !== 'INPUT') {
      if(topscreen != 1) {
        vanishTop(1);
      }
    }
    
  });
  
  // HTML
  return (
    <div className="bg-[url('/space.jpg')] min-h-screen bg-cover bg-center bg-black bg-opacity-30 filter">
      <NavBar LoggedIn={cookieLogged} username={(user!=null) ? user! : ""} controller={vanishTop}/>
      <SubApp smallScreen={isSmallScreen} />
      <LoginMenu LoginOrSignup={topscreen} Message={(topscreen == 0) ? "Login to Your Account" : "Sign up for your Account"} controller={vanishTop}/>

    </div>
  );
}

export default App
