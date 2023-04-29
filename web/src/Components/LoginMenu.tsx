import { useState } from "react";

// Props for configuration
interface configuration{
  LoginOrSignup: number // 0 for login, 1 for signup
  Message :string // Front Display Message
  controller: Function;
  update :Function;
}

function LoginMenu(props: configuration) {

  // Global configurations
  const [user, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [attempted, setAttempted] = useState(0);

  // Handle user
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  // Handle changes in password
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  // Functions array for what buttons do
  const functions: (() => string)[] = [
    () => props.controller(-1),
    () => props.controller(0),
    () => props.controller(1),
  ];  
    
  // Function to connect to database and updatae
  const loginUser = async () => {
    // Connect to database
    console.log("connecting to database...");

      // Try to fetch response
      if(user == "" || pass == "") {
        setErr("Username or password cannot be blank.")
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
          const response = await fetch(`http://${'localhost:' + 7000}/validateuser/`, requestOptions);
          const jsonData = await response.json();

          if(jsonData.status == 0) {
            setErr("Incorrect user or password.")
            setAttempted(attempted+1);
          }else if(jsonData.status == 2) {
            setErr("Connection timed out to database. Check back later.")
          } else {
            document.cookie = `user=${data.username};SameSite=Lax`;
            document.cookie = `authToken=${jsonData.token};SameSite=Lax`;
            props.update();
            setErr("Successfully Logged in!");
            props.controller(-1);
          }
        // Handle signup
        } else {
          console.log("Fetching at: " + `http://${'localhost:' + "7000"}`);
          const response = await fetch(`http://${'localhost:' + "7000"}/create_user/`, requestOptions)
          const jsonData = await response.json();

          if(jsonData.status == -1) {
            setErr("User already exists");
          }else {
            setErr("Successfully Created Account!");
            props.controller(0);
          }
        }
      }

  }

  // Handle submission when button is hit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser();
  };

  // Content
  return (
    <div id="menu" className = "fixed w-full h-[calc(100vh-4rem)] bg-opacity-90 translate-y-[-120%] justify-center items-center flex z-20">
      <form className = "w-96 h-96 relative bg-black rounded-md bg-opacity-80 items-center justify-center flex flex-col p-4 border-2 border-green-400" onSubmit={(e) => handleSubmit(e)}>
        <button onClick={functions[0]} type="button" className="text-white text-right w-full">X</button>
        <h1 className="text-3xl font-normal mt-4 text-white">{props.Message}</h1>

        <label className = "text-white inline-block mt-4">Username</label>
        <input className = "rounded-sm pl-1" type="text" value={user} onChange={handleChangeName}/>

        <label className = "text-white mt-4 inline-block">Password</label>

        <input className = {(attempted < 1) ? "rounded-sm pl-1 mb-12" : "rounded-sm pl-1 mb-4"} type="password" value={pass} onChange={handleChangePassword}/>

        <label className = {(err == "") ? "hidden" : "text-sm text-red-600 mb-8"}>{err}</label>

        <button id = 'login_button' className="flex-col border-green-400 text-green-400 rounded-md border-2 h-8 w-20 mb-4 hover:text-white hover:border-white" type="submit">{(props.LoginOrSignup == 0) ? "Login" : "Sign Up"}</button>
        <label className = {props.LoginOrSignup == 0 ? "text-sm text-white mb-4" : "hidden"}>Don't have an account? <button type="button" className = "underline font-bold" onClick={functions[2]}>Sign up!</button></label>
        <label className = {props.LoginOrSignup == 1 ? "text-sm text-white mb-4" : "hidden"}>Already have an account? <button type="button" className = "underline font-bold" onClick={functions[1]}>Sign in!</button></label>

        <label className = {(attempted < 2 || props.LoginOrSignup != 0) ? "hidden" : "text-sm text-red-600 mb-8"}><a href="#" className = "underline font-medium">Forgot password?</a></label>
      </form>
      </div>
  );
}
export default LoginMenu;
