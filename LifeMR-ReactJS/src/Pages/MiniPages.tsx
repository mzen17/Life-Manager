import { useState } from 'react';

import Sidebar from "../Components/Sidebar"
import Dashboard from "../Components/Dashboard"
import AssignmentForm from "../Components/AssignmentForm"


interface appconfig{
    smallScreen: boolean;
    username:string;
    token: string;
    loggedIn: boolean;
}

function subapps(props: appconfig) {
    const [app, setApp] = useState(0);

    function switcher (num: number) {
        setApp(num);
        console.log("app page: " + app);
    }

    const notLogged = () => {
        return(
            <div className = "max-w-screen overflow-x-hidden">
                <h1 className="text-white p-6 text-2xl">You must log in to use this app.</h1>
            </div>
        )
    }

    if(props.loggedIn) {
        return(
            <div className = "max-w-screen overflow-x-hidden">
            <Sidebar smallScreen={props.smallScreen} controller={switcher}/>
            {(() => {
            switch (app) {
                case 0:
                return <Dashboard username={props.username} token = {props.token} loggedIn = {props.loggedIn}/>;
                case 1:
                return <AssignmentForm username={props.username} token = {props.token} loggedIn = {props.loggedIn}/>;
                default:
                return <AssignmentForm username={props.username} token = {props.token} loggedIn = {props.loggedIn}/>;
            }
            })()}
            </div>
        )
    }else {
        return notLogged();
    }
}



export default subapps;