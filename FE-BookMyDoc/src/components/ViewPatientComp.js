import { useEffect, useState } from "react";

//THIS COMPONENT WILL DISPLAY PATIENT INFORMATION
export default function ViewPatientComp(){

    const pid=localStorage.getItem("viewId");
    const[info,setInfo]=useState(null);
    //getting the patient object by passing patient id that is stored on localstorage
    useEffect(()=>{

        fetch("http://localhost:8080/getPatientByPId?patient_id="+pid)
        .then(resp=>resp.json())
        .then(obj=>{
                setInfo(obj);
        })
    },[])

    return(
        <div>
            <h3>Patient Information</h3>

            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td>Patient ID : </td>
                        <td>{info && info.patient_id}</td>
                    </tr>
                    <tr>
                        <td>Name : </td>
                        <td>{info && info.user_id.fname} {info && info.user_id.lname}</td>
                    </tr>
                    <tr>
                        <td>BirthDate :</td>
                        <td>{info && info.birthdate}</td>
                    </tr>
                    <tr>
                        <td>Gender :</td>
                        <td>{info && info.user_id.gender}</td>
                    </tr>
                    <tr>
                        <td>Blood Group :</td>
                        <td>{info && info.blood_group}</td>
                    </tr>
                    <tr>
                        <td>Diabetes :</td>
                        <td>{info && info.diabetes}</td>
                    </tr>
                    <tr>
                        <td>Blood Pressure :</td>
                        <td>{info && info.blood_pressure}</td>
                    </tr>
                    <tr>
                        <td>Address :</td>
                        <td>{info && info.user_id.address_id.area}, {info && info.user_id.address_id.city}, {info && info.user_id.address_id.state}. -{info && info.user_id.address_id.pincode}</td>
                    </tr>
                    <tr>
                        <td>Contact no :</td>
                        <td>{info && info.user_id.contact_no}</td>
                    </tr>
               </tbody> 
            </table>
            {/* {JSON.stringify(info)} */}
        </div>
    )
}