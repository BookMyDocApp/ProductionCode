
import { Link, Route ,Routes ,useNavigate} from 'react-router-dom';
import './App.css';
import LoginComp from './components/LoginComp';

import AdminHomeComp from './components/AdminHomeComp';
import DoctorHomeComp from './components/DoctorHomeComp';
import PatientHomeComp from './components/PatientHomeComp';
import ViewAppointmentDoctorComp from './components/ViewAppointmentDoctorComp';
import ViewAppointmentPatientComp from './components/ViewAppointmentPatientComp';
import LogoutComp from './components/LogoutComp';
import PatientRegistrationComp from './components/PatientRegistrationComp';
import DoctorRegistrationComp from './components/DoctorRegistrationComp';
import AddScheduleComp from './components/AddScheduleComp';
import DoctorDeptComp from './components/DoctorDeptComp';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import AllDoctorsComp from './components/AllDoctorsComp';
import ViewSchedule from './components/ViewSchedule';
import HomeComp from './components/HomeComp';
import ApproveCancellationComp from './components/ApproveCancellationComp';
import ViewPatientComp from './components/ViewPatientComp';
import AdminViewDoctorsComp from './components/AdminViewDoctorsComp';
import AdminViewPatientsComp from './components/AdminViewPatientsComp';
import AdminViewAppointmentsComp from './components/AdminViewAppointmentsComp';
import ViewDoctorComp from './components/ViewDoctorComp';
import ContactUsComp from './components/ContactUsComp';
import AboutUsComp from './components/AboutUsComp';
import ForgetPasswordComp from './components/ForgetPasswordComp';
import ChangePasswordComp from './components/ChangePasswordComp';

function App() {

  const mystate = useSelector((state)=>state.logged);

  const[depts,setDepts]=useState([]);
  const[dname,setDname]=useState("");
  const navigate= useNavigate();
  
  //get all departments on loading of homepage/app.js for dropdown of departments
  useEffect(()=>{
    fetch("http://localhost:8080/getAllDepartments")
    .then((resp)=>resp.json())
    .then((deptlist)=>setDepts(deptlist))
  },[])

  //set dept name to display doctors departtment wise
  const handleSelect=event=>{
        localStorage.setItem("dname",dname);
        navigate("/doctorDept");
  }

  return (
    <div className="App">
     
        {/* <h1 className="bg-info text-blue">BookMyDoc-LifeLine Hospital</h1> */}
        <h1 className="bg-light-blue text-white" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
  <span style={{ fontWeight: 'bold', fontSize: '24px', color: 'red' }}>BookMyDoc</span>
  <span style={{ margin: '0 auto', fontWeight: 'bold', fontSize: '24px', background: 'linear-gradient(to right, #0052cc, #0084ff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>LifeLine Hospital</span>
  <span></span>
</h1>





      {/* if logged in, elements will not be displayed. If Not logged in elements(block) will be displayed. */}
      
      <div style={{display: mystate.loggedIn ? "none" : "block" }}>     
          <nav className="navbar navbar-expand-sm bg-light mb-3">
            <div  className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/" className="nav-link px-3">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="aboutus" className="nav-link px-3">About us</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="viewDoctors" className="nav-link px-3">Doctors</Link>
                    </li>
                    <li className="nav-item">

                    <DropdownButton variant="none"
                          title="Departments"
                          id="dropdown-menu-align-right"
                            >
                              {
                                depts.map((dept) => {
                                  return <Dropdown.Item onMouseDown={(e)=>{setDname(e.target.innerHTML)}} 
                                                        onMouseUp={handleSelect}>{dept}</Dropdown.Item>
                                })
                              }
                     </DropdownButton>

                    </li>
                    <li className="nav-item">
                      <Link to="patientRegistration" className="nav-link px-3">Patient Registration</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="contactus" className="nav-link px-3">Contact us</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="login" className="nav-link px-3">Login</Link>
                    </li>
                </ul>
            </div>
          </nav>

          {/*JSON.stringify(depts)*/}

        
      </div>
      <Routes>
          <Route path="/" element={<HomeComp/>}  />
          <Route path="/login" element={<LoginComp/>}  />

          <Route path="/adminhome" element={<AdminHomeComp/>}>
                <Route path="doctorRegistration" element={<DoctorRegistrationComp/>}  />
                <Route path="approveCancellation" element={<ApproveCancellationComp/>}  />  
                <Route path="viewAllDoctors" element={<AdminViewDoctorsComp/>}  />
                <Route path="viewAllPatients" element={<AdminViewPatientsComp/>}  />
                <Route path="viewAllAppointments" element={<AdminViewAppointmentsComp/>}  />
                <Route path="viewPatient" element={<ViewPatientComp/>}  />
                <Route path="viewDoctor" element={<ViewDoctorComp/>}  />
          </Route>

          <Route path="/doctorhome" element={<DoctorHomeComp/>}>
                <Route path="addSchedule" element={<AddScheduleComp/>}  />
                <Route path="viewDoctorAppointment" element={<ViewAppointmentDoctorComp/>}  />
                <Route path="viewPatient" element={<ViewPatientComp/>}  />

          </Route>
          
          <Route path="/patienthome" element={<PatientHomeComp/>}>
              <Route path="viewDoctors" element={<AllDoctorsComp/>}/>
              <Route path="viewSchedule" element={<ViewSchedule/>}/>
              <Route path="viewPatientAppointment" element={<ViewAppointmentPatientComp/>}  />
          </Route>
          
          <Route path="/viewDoctors" element={<AllDoctorsComp/>}/>
          <Route path="/logout" element={<LogoutComp/>}  />
          <Route path="/patientRegistration" element={<PatientRegistrationComp/>}  />   
          <Route path="/doctorDept" element={<DoctorDeptComp/>}/>  
          <Route path="/viewDoctors" element={<AllDoctorsComp/>}/>  
          <Route path="/contactus" element={<ContactUsComp/>}/> 
          <Route path="/aboutus" element={<AboutUsComp/>}/> 
          <Route path="/forgetPassword" element={<ForgetPasswordComp/>}/> 
          <Route path="/changePassword" element={<ChangePasswordComp/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
