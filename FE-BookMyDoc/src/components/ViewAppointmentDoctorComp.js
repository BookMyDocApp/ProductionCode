import { useEffect, useState, useReducer } from "react"
import { format } from 'date-fns'
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

export default function ViewAppointmentDoctorComp()
{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const doctorid=JSON.parse(localStorage.getItem("loggedDoctor")).doctor_id;
    const[Appointment,setAppointment]=useState([]);

    useEffect(()=>{

        fetch("http://localhost:8080/getAppointmentsofDoctor?doctor_id="+doctorid)   //pending to pass doctor id
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{
            setAppointment(obj);
        }) 
    },[])

    const navigate=useNavigate();
    const setStorage=(e)=>{

        localStorage.setItem("viewId",e);
        
    }

    return(

        <div>
            <h3>View Appointments</h3>
            {/*JSON.stringify(Appointment)*/}

            <form>
                    <table className="table table-striped">
                        <thead>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Time </th>
                            <th>Patient Name</th>
                        </thead>
                        <tbody>
                        {
                           Appointment.map((app)=>{
                           
                        
                               return(
                             
                            
                                <tr>
                                    <td>{app.date}</td>
                                    <td>{days[new Date(app.date).getDay()]}</td>
                                    <td>{app.slot}</td>
                                    <td>{app.patient_id.user_id.fname}  {app.patient_id.user_id.lname}</td>
                                    <td>
                               {/*  <button type="button" class="btn btn-primary" onCLick={()=>{viewPatient(app.patient_id.patient_id)}}>View Info</button>  */}
                                        <button type="submit" className="btn btn-primary btn-lg ms-2" onMouseDown={()=>{setStorage(app.patient_id.patient_id)}}
                                                                                      onMouseUp={()=>{navigate("/doctorhome/viewPatient")}}>View Info</button>

                                    </td>
                                    
                                </tr>
                               
                            ) })
                        }
                        </tbody>
                    </table>
                </form>
                {/* {JSON.stringify(Appointment)} */}
        </div>

    )
}