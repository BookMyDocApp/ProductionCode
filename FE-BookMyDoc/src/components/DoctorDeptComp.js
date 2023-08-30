import { useEffect, useState } from "react";
import docImage from'../images/doctor.png';
import {  useNavigate } from "react-router-dom"; 

export default function DoctorDeptComp(){

    const[doctors,setDoctors]=useState([]);
    const dept=localStorage.getItem("dname");  //retrieve dept name from local storage set in app.js

    useEffect(()=>{

        fetch("http://localhost:8080/getDoctorsByDept?department="+dept)
        .then(resp=>resp.json())                                
        .then((obj)=>{

            setDoctors(obj);

        })                                      
    },[dept]) //this useEffect will be executed for every update of dept 

    const navigate= useNavigate();
    const handleChange=()=>{

        
        alert("You are not Logged in yet...Please Login to proceed further")
        navigate("/login")
    }

    return(
        <div>
            <h2>Department of {dept}</h2>

            <form>
                <table className="table table-striped">
                    <tbody>
                    {   
                        doctors.map((doctor)=>{
                            return <tr>
                                    <td>
                                        <img src={docImage} height="150" width="150"/>
                                        <p> Dr. {doctor.user_id.fname} {doctor.user_id.lname}</p>
                                    </td>
                                    <td>
                                        <p>IMR no. : {doctor.imr_no}</p>
                                        <p>Qualification : {doctor.qualification}</p>
                                        <p>Specialization : {doctor.specialization}</p>
                                        <p>Experience : {doctor.experience}</p>
                                    </td>
                                    <td><button type="submit" className="btn btn-primary btn-lg ms-2" onClick={handleChange}>Book an Appointment</button></td>
                                </tr>
                        })  
                    }
                    </tbody>
                    </table>
            </form>




            { /* JSON.stringify(doctors) */ }
        </div>
    )
}