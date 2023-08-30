import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";


export default function AdminHomeComp(){

        

    return (
         <div>
            <h1>Admin Home</h1>

            <nav className="navbar navbar-expand-sm bg-light mb-3">
                <div  className="container-fluid">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="viewAllDoctors" className="nav-link px-3">View Doctors</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="viewAllPatients" className="nav-link px-3">View Patients</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="viewAllAppointments" className="nav-link px-3">View Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="approveCancellation" className="nav-link px-3">Approvals</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'doctorRegistration'} className="nav-link px-3">Register Doctor</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/logout" className="nav-link px-3">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
         </div>
    )
}