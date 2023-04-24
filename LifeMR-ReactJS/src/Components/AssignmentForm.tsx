import { useState } from "react";

interface Details {
  username: string;
  token: string;
  loggedIn: boolean;
}

interface Assignment {
  name: string;
  duedate: number;
  quicklink: string;
  weight: number;
}


function AssignmentForm(props: Details) {
  const [assignmentname, setName] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");

  function submit (e: any) {
    e.preventDefault();
    submitForm();
  }

  const submitForm = async() => {
    if(assignmentname == "" || link == "" || date == "") {
    }else {
      const data = {
        name: assignmentname,
        quicklink: link,
        duedate: date
      };

      console.log("Fetching with data: " + JSON.stringify(data));
      
      // set up the request options
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      };

      const response = await fetch(`http://localhost:7000/assignments/`, requestOptions);
      const jsonData = await response.json();

      if(jsonData.status != 0) {
        // Go to dashboard
      }else {
        console.log("Error.");
      }
    }
  }

    // Handle user
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    }
  
    // Handle changes in password
    const handleChangeLink = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLink(e.target.value);
    }

    // Handle changes in date
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setDate(e.target.value);
    }
  


  return (
    <form id="main-app" className="md:translate-x-48 z-0 p-4" onSubmit={submit}>
        <h1 className = "text-white text-3xl pb-3 underline">Add an assignment</h1>
        <label className="text-white text-md inline-block rounded-md pb-1">Assignment Name</label>
        <input className="text-black h-6 text-md flex rounded-sm mb-8 w-128 items-center" id="name" type="text" onChange = {handleChangeName}/>

        <label className="text-white text-md inline-block rounded-md pb-1">Assignment Link</label>
        <input className="text-black h-6 text-md flex rounded-sm mb-8 w-128 items-center" id="quicklink" type="text" onChange = {handleChangeLink}/>

        <label className="text-white text-md inline-block rounded-md pb-1">Assignment Due Date</label>
        <input className="text-black h-6 text-md flex rounded-sm mb-8 w-128 items-center" id="date" type="datetime-local" onChange = {handleChangeDate}/>

        <button type="submit" className="border-2 p-2 text-white text-md inline-block rounded-md pb-1">Create</button>
    </form>
  )
}

export default AssignmentForm;
