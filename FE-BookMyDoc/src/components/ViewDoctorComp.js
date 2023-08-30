import { useEffect, useState } from "react";

//THIS COMPONENT WILL DISPLAY PATIENT INFORMATION
export default function ViewDoctorComp(){

    const did=localStorage.getItem("viewId");
    const[info,setInfo]=useState(null);
    //getting the patient object by passing patient id that is stored on localstorage
    useEffect(()=>{

        fetch("http://localhost:8080/getDoctorByDId?doctor_id="+did)
        .then(resp=>resp.json())
        .then(obj=>{
                setInfo(obj);
        })
    },[])

    return(
        <div>
            <h3>Doctor Information</h3>

            <table className="table table-striped">
                <tbody>
                    <tr>
                        <td>Doctor ID : </td>
                        <td>{info && info.doctor_id}</td>
                    </tr>
                    <tr>
                        <td>Name : </td>
                        <td>{info && info.user_id.fname} {info && info.user_id.lname}</td>
                    </tr>
                    <tr>
                        <td>Qualification :</td>
                        <td>{info && info.qualification}</td>
                    </tr>
                    <tr>
                        <td>Specialization :</td>
                        <td>{info && info.specialization}</td>
                    </tr>
                    <tr>
                        <td>Experience :</td>
                        <td>{info && info.experience}</td>
                    </tr>
                    <tr>
                        <td>Department :</td>
                        <td>{info && info.department}</td>
                    </tr>
                    <tr>
                        <td>IMR no. :</td>
                        <td>{info && info.imr_no}</td>
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