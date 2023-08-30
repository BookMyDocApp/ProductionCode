import { useEffect, useState, useReducer } from "react"

export default function ViewAppointmentPatientComp()
{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const patientid=JSON.parse(localStorage.getItem("loggedPatient")).patient_id;
    const[Appointment,setAppointment]=useState([]);

    useEffect(()=>{

        fetch("http://localhost:8080/getAppointmentsofPatient?patient_id="+patientid)   //pending to pass doctor id
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{
            setAppointment(obj);
        }) 
    },[])

    const requestCancellation=(e)=>{

        fetch("http://localhost:8080/appointmentCancellationRequest?app_id="+e)
        .then(resp=>resp.json())
        .then(obj=>  {    if(obj===true)
                        {
                            alert("Your request for cancellation of appointment has been raised...");
                        }
                    
        })
    }

    return(

        <div>
            <h1>View Appointments</h1>
            {/*JSON.stringify(Appointment)*/}

            <form>
                    <table className="table table-striped">
                        <thead>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Time </th>
                            <th>Doctor Name</th>
                        </thead>
                        <tbody>
                        {
                           Appointment.map((app)=>{
                           
                        
                               return(
                                <tr>
                                    <td>{app.date}</td>
                                    <td>{days[new Date(app.date).getDay()]}</td>
                                    <td>{app.slot}</td>
                                    <td>{app.doctor_id.user_id.fname}  {app.doctor_id.user_id.lname}</td>
                                    <td> 
                                        <button type="submit" className="btn btn-danger" disabled={app.status_id.status_id===1?false:true} onClick={()=>{requestCancellation(app.app_id)}}>Cancel</button>
                                    </td> 
                                    <td> 
                                        {app.status_id.status_id===4?<p>Cancellation Requested</p>:app.status_id.status_id===3?<p>Cancellation Accepted</p>:""}    
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