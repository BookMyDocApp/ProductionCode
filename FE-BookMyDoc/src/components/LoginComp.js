import { useReducer , useState} from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./slice";
import { Link } from "react-router-dom";

export default function  LoginComp (){

    const init = {
        email:"",
        password:""
    }

    const reducer=(state,action)=>{
        switch(action.type)
        {
            case 'update':
                return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
        
    }
        const [info,dispatch]=useReducer(reducer,init);
        const [msg,setMsg]=useState("");
        const navigate= useNavigate();
        const reduxAction=useDispatch();
        
       const sendData=(e) =>{
            e.preventDefault();

            const reqOptions={
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(info)
            }
            fetch("http://localhost:8080/login",reqOptions)
            .then(resp=>resp.text())
            .then(text=>text.length ? JSON.parse(text):{})
            .then(obj => {
                if(Object.keys(obj).length === 0)
                 {
                     alert("Invalid data...")
                    setMsg("Wrong Uid/Password");
                 }
                 else
                 {
                     reduxAction(login());

                     localStorage.setItem("loggedUser",JSON.stringify(obj));
                     
                            if(obj.role_id.role_id === 1)
                            {
                                    navigate("/adminhome");
                            }
                            else if(obj.role_id.role_id === 2 )
                            {
                                navigate("/doctorhome");
                            }
                            else if(obj.role_id.role_id === 3)
                            {
                                navigate("/patienthome");
                            }
                        
                 }
            })
        }

    return(
        <div className="pat">    
        <br/>
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            
              <div class="container h-100">        
                <div class="row d-flex justify-content-center align-items-center h-100">          
                  <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" >
                      <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5">Login</h2>

                        <form>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="email"><b> Email</b></label>
                                    <input type="email" id="email" placeholder="Enter email" name="email" value={info.email} class="form-control form-control-lg"
                                    onChange={(e)=>{dispatch({type:'update',fld:'email',val:e.target.value})}} />
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="password"><b>Password</b></label>
                                    <input type="password" id="password" placeholder="Enter password" name="password" value={info.password} class="form-control form-control-lg" 
                                        onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
                                </div>

                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="reset" class="btn btn-light btn-lg" onClick={()=>{dispatch({type:'reset'})}}>Reset</button>
                                    <button type="submit" class="btn btn-info btn-lg ms-2" onClick={(e)=>{sendData(e)}}>Submit</button>
                                </div>

                                <p style={{color:"red"}}>{msg}</p>

                        </form>
                        <Link to="/forgetPassword" className="nav-link px-3">Forget Password</Link>
                        <Link to="/patientRegistration" className="nav-link px-3">New Patient ? Register here ...</Link>

                       </div>
                     </div>
                  </div>
               </div>
               </div>
             </div>
           
       
        
        {/* <p>{JSON.stringify(info)}</p>    */}
        

    </div>    
    )
}