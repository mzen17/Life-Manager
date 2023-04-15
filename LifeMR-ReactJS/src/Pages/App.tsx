import { useState, useEffect } from 'react'
import NavBar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Calendar from "../Components/Calendar";

function App() {
  const user = document.cookie
  .split("; ")
  .find((row) => row.startsWith("user="))
  ?.split("=")[1];

  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("authToken="))
  ?.split("=")[1];

  const [cookieLogged, setCookieLogged] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (token !== "" && user !== "" && cookieLogged === false) {
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
          `http://127.0.0.1:8000/validatetoken/`,
          requestOptions
        );
        const jsonData = await response.json();
        console.log(jsonData);
        setCookieLogged(jsonData.status);
      }
    }
  
    fetchData();
  }, [token, user, cookieLogged]);
  
  
  return (
    <div className="bg-[url('/Background.jpg')] min-h-screen bg-cover bg-center bg-black bg-opacity-30 filter">
      <NavBar LoggedIn={cookieLogged} username={(user!=null) ? user! : ""}/>
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App
