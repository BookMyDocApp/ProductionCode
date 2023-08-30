import { useEffect, useState } from "react";
import docImage from'../images/doctor.png';
import {  useNavigate } from "react-router-dom"; 
import { useSelector } from 'react-redux';

export default function AllDoctorsComp(){

    const[doctors,setDoctors]=useState([]);
    const[doctorid,setDoctorid]=useState([]);
    const mystate = useSelector((state)=>state.logged);

    //get all doctors
    useEffect(()=>{

        fetch("http://localhost:8080/getAllDoctors")
        .then(resp=>resp.json())                                //resp.json - this will return an object from json response
        .then((obj)=>{

            setDoctors(obj);

        })                                      
    },[])

    const navigate= useNavigate();

    //set doctorid using useState to set it in local storage to fetch schedule
    const handleChange2=(e)=>{

        setDoctorid(e);
    }

    //navigating to view schedule of selected doctor or login page
    const handleChange=(e)=>{
        if(mystate.loggedIn){
            localStorage.setItem("doctorid",doctorid);
            navigate("/patienthome/viewSchedule")
        }
        else{
        alert("You are not Logged in yet...Please Login to proceed further")
        navigate("/login")
        }

    
    }

    return(
        <div>
            <h2 className="fon">List of Doctors </h2>
            <br/>
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
                                    <td><button type="submit" className="btn btn-primary btn-lg ms-2" onMouseDown={()=>{return handleChange2(doctor.doctor_id)}}  onMouseUp={handleChange}>Book an Appointment</button></td>
                                </tr>
                        })  
                    }
                    </tbody>
                    </table>
            </form>
            {/* {JSON.stringify(doctors)} */}
        </div>
    )
}