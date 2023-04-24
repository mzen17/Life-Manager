import Sidebar from "../Components/Sidebar"
import Dashboard from "../Components/Dashboard"

interface appconfig{
    smallScreen: boolean;
    username:string;
    token: string;
    loggedIn: boolean;
}

function subapps(props: appconfig) {
   return props.loggedIn ? (
    <div className = "max-w-screen overflow-x-hidden">
        <Sidebar smallScreen={props.smallScreen} />
        <Dashboard username={props.username} token = {props.token} loggedIn = {props.loggedIn}/>
    </div>
   ) : (
    <div className = "max-w-screen overflow-x-hidden">
        <h1 className="text-white p-6 text-2xl">You must log in to use this app.</h1>
    </div>
   );
}

export default subapps;