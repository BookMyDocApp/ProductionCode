import { useEffect ,useState } from "react"

export default function AdminViewAppointmentsComp(){

    const[appointments,setAppointments]=useState([]);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(()=>{

        fetch("http://localhost:8080/getAllAppointments")
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{

            setAppointments(obj);

        })       
    },[])

    return(
        <div>
            <h3 className="fon">Appointments Information</h3>
            <br/>
            <form>
                <table className="table table-striped">
                    <thead>
                        <th>Appointment ID</th>
                        <th>Patient Name</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Day</th>
                        <th>Time </th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                    {   
                        appointments.map((app)=>{
                            return <tr>
                                        <td>
                                            <p>{app.app_id}</p>
                                        </td>
                                        <td>
                                            <p> {app.patient_id.user_id.fname} {app.patient_id.user_id.lname}</p>
                                        </td>
                                        <td>
                                            <p>Dr. {app.doctor_id.user_id.fname} {app.doctor_id.user_id.lname}</p>
                                        </td>
                                        <td>
                                            <p>{app.date}</p>
                                        </td>
                                        <td>
                                            <p>{days[new Date(app.date).getDay()]}</p>
                                        </td>
                                        <td>
                                        <p>{app.slot}</p>
                                        </td>
                                        <td>
                                            {app.status_id.status}
                                        </td>
                                        
                                </tr>
                        })  
                    }
                    </tbody>
                </table>
             </form>
        </div>
    )
}