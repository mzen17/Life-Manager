import { useState } from "react"

import Sidebar from "../Components/Sidebar"
import Calendar from "../Components/Calendar"
import React from "react";

interface appconfig{
    smallScreen: boolean;
}

function subapps(props: appconfig) {
   return (
    <div className = "max-w-screen overflow-x-hidden">
        <Sidebar smallScreen={props.smallScreen} />
        <Calendar />
    </div>
   );
}

export default subapps;