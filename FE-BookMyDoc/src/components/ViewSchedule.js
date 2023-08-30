import { useEffect, useState, useReducer } from "react"
import { useNavigate } from "react-router-dom";

export default function ViewSchedule()
{
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const init={
        date:"",
        doctor_id:0,
        patient_id:0,
        slot:"",
        status_id:""
    }

    const navigate= useNavigate();
    const doctorid=localStorage.getItem("doctorid");
    const[slots,setSlots]=useState([]);
    const[doctor,setDoctor]=useState({});
    const patientid=JSON.parse(localStorage.getItem("loggedPatient")).patient_id;

    const reducer=(state,action)=>{
        switch(action.type)
        {
            case 'update':
                const{date,doctor_id,patient_id,slot,status_id}=action.data;
                return {...state,date,doctor_id,patient_id,slot,status_id};
            case 'reset':
                return init;
        }
        
    }

    const [info,dispatch]=useReducer(reducer,init);

    // get schedule of doctor by passing id
    useEffect(()=>{

        fetch("http://localhost:8080/getSchedule?doctor_id="+doctorid)   //pending to pass doctor id
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{
            setSlots(obj);
        })
    },[]) 
    
    useEffect(()=>{
        fetch("http://localhost:8080/getDoctorByDId?doctor_id="+doctorid)
        .then(resp=>resp.json())
        .then(obj=>{
            setDoctor(obj);
        })
    },[])
        
    const sendData=(e) =>{
        e.preventDefault();
        const reqOptions={
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info)
        }
        fetch("http://localhost:8080/addAppointment",reqOptions)
        .then(resp=>{
                    if(resp.ok)
                    {
                      console.log("data send");
                     // alert("appointment booked...");
                      navigate("/patienthome");
                    }
                    })                
                   
                   
    }

    return(
        <div>
    
                <form>
                    <table class="table table-striped">
                        <thead>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Slot Timings</th>
                        </thead>
                        <tbody>
                        {
                            slots.map((sd)=>{
                               return <tr>
                                    <td><p>{sd.date}</p></td>
                                    <td><p>{days[new Date(sd.date).getDay()]}</p></td>
                                    <td>
                                        {sd.slots.map((st)=>{
                                            return  <button type="submit" class="btn btn-primary btn-lg ms-2"  disabled={st.status?false:true}
                                                        onMouseDown={()=>{dispatch({type:'update',data:{date:sd.date,doctor_id:doctorid,patient_id:patientid,slot:st.slot_time,status_id:"1"}})}}
                                                        onMouseUp={(e)=>sendData(e)}>{st.slot_time}</button>
                                                    
                                        })}
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </form>

            {/* {JSON.stringify(slots)}
            {JSON.stringify(doctor)}
            {JSON.stringify(info)} */}
        </div>

    )
}