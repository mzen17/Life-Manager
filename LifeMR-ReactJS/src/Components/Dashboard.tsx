import { useState, useEffect } from "react";

interface Details {
  username: string;
  token: string;
  loggedIn: boolean;
}

interface Assignment {
  name: string;
  duedate: number;
  description: string;
  quicklink: string;
  weight: number;
}

function Dashboard(props: Details) {
  const [assignmentList, setList] = useState<Assignment[]>([]);

  useEffect(() => {
    async function loadJson() {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (props.username !== "" && props.token !== "") {
        const response = await fetch(
          `http://localhost:7000/assignments/${props.username}`,
          requestOptions
        );
        const jsonData = await response.json();
        console.log(JSON.stringify(jsonData));
        setList(jsonData.assignments);
      }
    }
    loadJson();
  }, [props.username, props.token]);

  return (
    <div id="main-app" className="md:translate-x-48 z-0 p-4">
      <h1 className="text-2xl font-normal inline-block text-white">
        Welcome to your dashboard!
      </h1>
      {
        (assignmentList.length > 0) ? (
          assignmentList.map((assignment) => <div className="text-white" key={assignment.name}>{assignment.name}</div>)
        ) : (
          <div className = "text-white pt-2">You have no assignments.</div>
        )
    }

      <button id="create" className="mt-64 border-2 border-purple-400 text-purple-400 p-2 hover:border-white hover:text-white rounded-lg text-sm">+ Assignment</button>
    </div>
  )
}

export default Dashboard;
