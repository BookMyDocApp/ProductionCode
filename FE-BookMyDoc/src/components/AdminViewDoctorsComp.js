import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminViewDoctorsComp() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/getAllDoctors")
      .then((resp) => resp.json()) //resp.json - this will return an object from json response
      .then((obj) => {
        setDoctors(obj);
      });
  }, []);

  const navigate = useNavigate();
  const setStorage = (e) => {
    localStorage.setItem("viewId", e);
  };

const deleteDoctor = (e) => {
    console.log(e);
    fetch(`http://localhost:8080/deleteByUserId?user_id=${e.user_id}`, {
      method: 'DELETE', // Specify the DELETE method
    })
      .then((resp) => resp.json())
      .then((obj) => {
        console.log(obj); // Log the response to see if it indicates success or failure
        if (obj.success === true) {
          alert("Doctor removed...");
          // Optionally, you can update the list of doctors here by fetching the updated list from the server.
        } else {
          alert("Failed to remove doctor. Error: " + obj.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  

  return (
    <div>
      <h3 className="fon">Doctors Information</h3>
      <br />
      <form>
        <table className="table table-striped">
          <thead>
            <th>Doctor ID</th>
            <th>Name</th>
            <th>Department </th>
            <th></th>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              return (
                <tr>
                  <td>
                    <p>{doctor.doctor_id}</p>
                  </td>
                  <td>
                    <p>
                      {" "}
                      Dr. {doctor.user_id.fname} {doctor.user_id.lname}
                    </p>
                  </td>
                  <td>
                    <p>{doctor.department}</p>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg ms-2"
                      onMouseDown={() => {
                        setStorage(doctor.doctor_id);
                      }}
                      onMouseUp={() => {
                        navigate("/adminhome/viewDoctor");
                      }}
                    >
                      View Info
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg ms-2"
                      onClick={() => {
                       
                        deleteDoctor(doctor.user_id);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
    </div>
  );
}
