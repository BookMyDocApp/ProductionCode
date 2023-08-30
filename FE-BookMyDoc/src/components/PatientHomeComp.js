import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PatientHomeComp(){

    const[ patient, setPatient ]=useState(null);

    useEffect(()=>{

        const userid=JSON.parse(localStorage.getItem("loggedUser")).user_id;

        fetch("http://localhost:8080/getPatientByUId?user_id="+userid)
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{

            localStorage.setItem("loggedPatient",JSON.stringify(obj));
            setPatient(obj);

        })                                      
    },[])

    return(
        <div>
            <h1><p>Welcome {patient && patient.user_id.fname} {patient && patient.user_id.lname}</p></h1>

            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div  className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                           
                            <Link to="viewPatientAppointment" className="nav-link px-3">My Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="viewDoctors" className="nav-link px-3">Book An Appointment</Link>
                        </li>
                 
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <Outlet/>
        </div>
    )
}