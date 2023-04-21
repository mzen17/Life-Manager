import React, { useState, useEffect } from "react";

function Calendar() {
  const [onOff, setStat] = useState(false);
    return (
        <div id="main-app" className = "md:translate-x-48 z-0">
          <h1 className={"text-3xl font-normal inline-block pl-4 text-white" }> Welcome to your dashboard!</h1>    
        </div>
      );
}
export default Calendar;