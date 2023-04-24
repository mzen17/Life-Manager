import { useState, useEffect } from 'react'
import { useMediaQuery } from '@react-hook/media-query';

import SubApp from "./MiniPages";
import NavBar from "../Components/Navbar";
import LoginMenu from '../Components/LoginMenu';
import { diffProps } from '@react-three/fiber/dist/declarations/src/core/utils';


function App() {
  // Manage screen size
  const isSmallScreen = useMediaQuery('(max-width: 640px)');

  // Panel manager (None, Login, Sign Up, Settings)
  const [topscreen, setTop] = useState(-1);

  // Get username from cookies
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");

  // Cookie manager
  const [cookieLogged, setCookieLogged] = useState(false);

  async function appUpdate() {
    console.log("Current cookies are: " + document.cookie);
     // Set cookies
     setUser(document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1] || ""); // provide a default value of ""

    setToken(document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="))
      ?.split("=")[1] || ""); // provide a default value of ""

    console.log("Using values user=" + user + " token=" + token);

    
    if (token != null && token !== "" && user !== null && user !== "" && cookieLogged === false) {
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

  // When mounted, check cookie
  useEffect(() => {
   appUpdate();
  }, [token, user, cookieLogged]);

  //

  // Slide and adjust top depending on status
  const vanishTop = async (id: number) => {
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
    <div className="min-h-screen bg-cover bg-center bg-black filter">
      <NavBar LoggedIn={cookieLogged} smallScreen={isSmallScreen} controller={vanishTop}/>
      <LoginMenu LoginOrSignup={topscreen} Message={(topscreen == 0) ? "Login" : "Sign up"} controller={vanishTop} update={appUpdate}/>
      <SubApp smallScreen={isSmallScreen} username={user} token = {token} loggedIn = {cookieLogged} />
    </div>
  );
}

export default App