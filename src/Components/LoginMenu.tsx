import React, { useState } from "react";

// Props for configuration
interface configuration{
  LoginOrSignup: number // 0 for login, 1 for signup
  Message :string // Front Display Message
}

function LoginMenu(props: configuration) {

  // Global configurations
  const [user, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [attempted, setAttempted] = useState(0);

  // Handle user and password changes
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
    
  // Function to connect to database and updatae
  const loginUser = async () => {
    // Connect to database
    console.log("connecting to database...");

        // Try to fetch response
        try {
          if(user == "" || pass == "") {
            setErr("You must put in values.")
          }else {
            const data = {
              username: user,
              password: pass
            };
            
            // set up the request options
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify(data)
            };
            
            // Handle login
            if(props.LoginOrSignup == 0) {
              const response = await fetch(`http://127.0.0.1:8000/validateuser/`, requestOptions);
              const jsonData = await response.json();

              if(jsonData.status == 0) {
                setErr("Incorrect user or password.")
                setAttempted(attempted+1);
              }else if(jsonData.status == 2) {
                setErr("Connection timed out to database. Check back later.")
              } else {
                const token = jsonData.token;
                document.cookie = `user=${data.username}`
                document.cookie = `authToken=${token}`;
                window.location.assign('/');
              }
            // Handle signup
            } else {
              const response = await fetch(`http://127.0.0.1:8000/create_user/`, requestOptions)
              const jsonData = await response.json();

              if(jsonData.status == -1) {
                setErr("User already exists");
              }else {
                window.location.assign('/');
              }
            }
          }
        } catch (error) {
          console.error(error);
        }
      }

    // Handle submission when button is hit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      loginUser();
    };
  
    return (
        <form className = "w-96 h-96 fixed bg-black rounded-md bg-opacity-50 items-center justify-center flex flex-col p-4" onSubmit={(e) => handleSubmit(e)}>
          <h1 className="text-3xl font-normal mt-4 text-white">{props.Message}</h1>

          <label className = "text-white inline-block mt-4">Username</label>
          <input className = "rounded-sm pl-1" type="text" value={user} onChange={handleChangeName}/>

          <label className = "text-white mt-4 inline-block">Password</label>

          <input className = {(attempted < 1) ? "rounded-sm pl-1 mb-12" : "rounded-sm pl-1 mb-4"} type="password" value={pass} onChange={handleChangePassword}/>

          <label className = {(err == "") ? "hidden" : "text-sm text-red-600 mb-8"}>{err}</label>

          <button id = 'login_button' className="flex-col border-green-400 text-green-400 rounded-md border-2 h-8 w-20 mb-4 hover:text-white hover:border-white" type="submit">{(props.LoginOrSignup == 0) ? "Login" : "Sign Up"}</button>
          <label className = {props.LoginOrSignup == 0 ? "text-sm text-white mb-4" : "hidden"}>Don't have an account? <a href="/signup" className = "underline font-bold">Sign up!</a></label>
          <label className = {props.LoginOrSignup == 1 ? "text-sm text-white mb-4" : "hidden"}>Already have an account? <a href="/login" className = "underline font-bold">Sign in!</a></label>

          <label className = {(attempted < 2 || props.LoginOrSignup != 0) ? "hidden" : "text-sm text-red-600 mb-8"}><a href="#" className = "underline font-medium">Forgot password?</a></label>
        </form>
      );
}
export default LoginMenu;
