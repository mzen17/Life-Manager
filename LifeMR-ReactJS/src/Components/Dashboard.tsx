import { useState, useEffect } from "react";

interface Details {
  username: string;
  token: string;
  loggedIn: boolean;
  controller: Function;
}

interface Assignment {
  name: string;
  duedate: number;
  description: string;
  quicklink: string;
  weight: number;
}

interface Classes{
  name: string;
  grade: number;
}

function Dashboard(props: Details) {

  // Format UNIX time
  function formatTime(time: number): string {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  }
  
  // List of assignments
  const [assignmentList, setList] = useState<Assignment[]>([]);
  const [classList, setClasses] = useState<Classes[]>([]);
  console.log(classList.length);

  // Fetch assignments and grades
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
        setList(jsonData.assignments);
      }

      if (props.username !== "" && props.token !== "") {
        console.log("Fetching... " + `http://localhost:7000/grades/${props.username}`)
        const response = await fetch(
          `http://localhost:7000/grades/${props.username}`,
          requestOptions
        );
        const jsonData = await response.json();
        setClasses(jsonData.grades);
      }
    }
    loadJson();
  }, [props.username, props.token]);

  // Update due dates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedList = assignmentList.map(a => {
        return {...a, duedate: a.duedate};
      })
      setList(updatedList);
    }, 1000);
    return () => clearInterval(interval);
  }, [assignmentList]);

  // Return main app
  return (
    <div id="main-app" className="md:translate-x-48 z-0 p-4">
      <h1 className="text-2xl font-normal inline-block text-white">
        Welcome to your dashboard!
      </h1>
      {
        (assignmentList.length > 0) ? (
          <table className="text-center mt-4 w-[90%]">
            <thead>
              <tr className="text-white border-t-2 w-[60%] border-white">
                <th className="w-[30%] py-2">Task</th>
                <th className="w-[30%] py-2">Time Remaining</th>
              </tr>
            </thead>
            <tbody>
              {assignmentList.map((assignment) => (
                <tr className="text-white border-y-2 border-white border-opacity-40" key={assignment.name}>
                  <td className = "py-2">{assignment.name}</td>
                  <td>{formatTime(Math.floor(new Date(assignment.duedate).getTime() / 1000) - Math.floor(Date.now() / 1000))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className = "text-white pt-2">You have no assignments.</div>
        )
      }
      {
        (classList.length > 0) ? (
          <table className="text-center">
            <thead>
              <tr className="text-white">
                <th className="w-64">Class</th>
                <th className="w-96">Grade</th>
              </tr>
            </thead>
            <tbody>
              {classList.map((classItem) => (
                <tr className="text-white" key={classItem.name}>
                  <td>{classItem.name}</td>
                  <td>{formatTime(classItem.grade)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className = "text-xl font-normal inline-block text-white pt-32">You have no grades linked. <a href="#" className="underline">Link</a> now.</div>
        )
      }
    </div>
  )
}

export default Dashboard;
