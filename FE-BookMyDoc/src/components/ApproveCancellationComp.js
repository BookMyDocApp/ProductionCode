import { useEffect, useState } from "react"

//THIS COMPONENT DISPLAYS ALL THE APPOINTMENTS WHICH ARE REQUESTED FOR CANCELLATION
export default function ApproveCancellationComp(){

    const[requests,setRequests]=useState([]);

    //getting list of appointments which are requested for cancellation
    useEffect(()=>{

        fetch("http://localhost:8080/cancellationRequestedAppointments")
        .then(resp=>resp.json())
        .then(obj=>{
                    setRequests(obj);
        })

    },[])

    //Approving cancellation on click of approve button (REST API - changing status of appointment to 3 i.e cancelled)
    const approveCancellation=(e)=>{

        fetch("http://localhost:8080/approveAppointmentCancellation?app_id="+e)
        .then(resp=>resp.json())
        .then(obj=>  {    if(obj===true)
                        {
                            alert("Cancellation Approved...");
                        }
                    
        })
    }


    return(
        <div>

            <h3>Appointment Cancellation Requests</h3>

            <form>
                <table className="table table-striped">
                    <thead>
                            <th>Date</th>
                            <th>Time </th>
                            <th>Doctor Name</th>
                            <th>Patient Name</th>
                            <th></th>
                    </thead>
                    <tbody>
                    {   
                        requests.map((req)=>{
                            return <tr>
                                    <td><p>{req.date}</p></td>
                                    <td><p>{req.slot}</p></td>
                                    <td><p>Dr. {req.doctor_id.user_id.fname} {req.doctor_id.user_id.lname}</p></td>
                                    <td><p>{req.patient_id.user_id.fname} {req.patient_id.user_id.lname}</p></td>
                                    <td><button type="submit" class="btn btn-primary btn-lg ms-2" onClick={()=>{approveCancellation(req.app_id)}}>Approve</button></td>
                                </tr>
                        })  
                    }
                    </tbody>
                    </table>
            </form>

{/* 
            {JSON.stringify(requests)} */}
        </div>
    )
}