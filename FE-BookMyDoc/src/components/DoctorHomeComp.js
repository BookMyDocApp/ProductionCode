import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DoctorHomeComp(){

        const[ doctor, setDoctor ]=useState(null);

    useEffect(()=>{

        const userid=JSON.parse(localStorage.getItem("loggedUser")).user_id;

        fetch("http://localhost:8080/getDoctorByUId?user_id="+userid)
        //.then((resp)=>resp.text())
        //.then(text=>text.length?JSON.parse(text):{}) 
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{

            localStorage.setItem("loggedDoctor",JSON.stringify(obj));
            setDoctor(obj);

        })                                      
    },[])
   

    return(
        <div>
            <h1>Doctor Home Page</h1>

            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div  className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="viewDoctorAppointment" className="nav-link px-3">View Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="addSchedule" className="nav-link px-3">Add Schedule</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>

                 <p> <h1>Welcome {doctor && doctor.user_id.fname} {doctor && doctor.user_id.lname} </h1></p>

                <Outlet/> 
        </div>
    )
}