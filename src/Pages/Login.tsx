import { useState } from 'react'
import LoginMenu from "../Components/LoginMenu";


// Props for configuration
interface configuration{
    LoginOrSignup: number // 0 for login, 1 for signup
    Message :string // Front Display Message
  }

function Login(props: configuration) {

  return (
    <div className="bg-[url('/Background.jpg')] min-h-screen bg-cover bg-center bg-opacity-10 flex w-screen items-center justify-center">
      <LoginMenu LoginOrSignup = {props.LoginOrSignup} Message = {props.Message}/>
    </div>
  );
}

export default Login
