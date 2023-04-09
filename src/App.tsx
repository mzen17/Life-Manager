import { useState } from 'react'
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Calendar from "./Components/Calendar";


function App() {
  return (
    <div className="bg-[url('/Background.jpg')] min-h-screen bg-cover bg-center bg-black bg-opacity-30 filter">
      <Navbar />
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App
