import { useReducer , useState} from "react";
import {  useNavigate, Outlet } from "react-router-dom";

export default function DoctorRegistrationComp(){

    const init = {
        fname:{value:"",touched:false,valid:false,error:""},
        lname:{value:"",touched:false,valid:false,error:""},
        email:{value:"",touched:false,valid:false,error:""},
        password:{value:"",touched:false,valid:false,error:""},
        cpassword:{value:"",touched:false,valid:false,error:""},
        contact_no:{value:"",touched:false,valid:false,error:""},
        gender:{value:"",touched:false,valid:false,error:""},
        area:{value:"",touched:false,valid:false,error:""},
        city:{value:"",touched:false,valid:false,error:""},
        state:{value:"",touched:false,valid:false,error:""},
        pincode:{value:"",touched:false,valid:false,error:""},
        role_id:{value:"",touched:false,valid:false,error:""},
        question_id:{value:"",touched:false,valid:false,error:""},
        answer:{value:"",touched:false,valid:false,error:""},
        qualification:{value:"",touched:false,valid:false,error:""},
        specialization:{value:"",touched:false,valid:false,error:""},
        experience:{value:"",touched:false,valid:false,error:""},
        //image:"",
        imr_no:{value:"",touched:false,valid:false,error:""},
        department:{value:"",touched:false,valid:false,error:""},
        type:{value:"",touched:false,valid:false,error:""}
        
    }

    const validateData = (name,value) => {
        let valid = false;
        let error = "";
        switch(name) {
            case 'fname': var pattern = /^[A-Z][a-z]{2,15}$/
                              if(pattern.test(value))
                              {
                                 valid = true;
                                 error = "";
                              }
                              else
                              {
                                 valid = false;
                                 error = "First letter should be Capital"
                              }
                              break;
            case 'lname':  var pattern = /^[A-Z][a-z]{2,15}$/
                              if(pattern.test(value))
                              {
                                valid = true;
                                error = "";
                               }
                               else
                               {
                                valid = false;
                                error = "Last name invalid"
                               }
                              break;
            case 'email':     var pattern = /^[A-Za-z0-9_.-]{3,15}@gmail.com$/
                              if(pattern.test(value))
                              {
                                valid = true;
                                error = "";
                              }
                              else
                              {
                                valid = false;
                                error = "Email invalid"
                              }
                              break;
            case 'password':  var pattern = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{5,}$/
                                if(pattern.test(value))
                                {
                                valid = true;
                                error = "";
                                }
                                else
                                {
                                valid = false;
                                error = "Password invalid"
                                }
                              break;
            case 'contact_no':
                             var pattern = /^[0-9]{10}$/
                              if(pattern.test(value) )
                              {
                                valid = true;
                                error = "";
                              } 
                              else
                              {
                                valid = false;
                                error = "contact_no do not match"
                              }     
                              break;
                            
        
        case 'cpassword':
            if(info.password.value === value)
            {
              valid = true;
              error = "";
            } 
            else
            {
              valid = false;
              error = "Passwords do not match"
            }     
            break;
          
        }
        return {valid, error};
    }

    const reducer=(state,action)=> {
        switch(action.type)
        {
            case 'update':
                const {name, value, touched, valid,error,formvalid} = action.data
                //console.log(formvalid)
                return {...state, [name]: {value, touched, valid, error}, formvalid }
                //return {...state,[action.fld]:action.val}
            case 'reset':
                return init;
        }
        
    }

    const handleChange = (name,value) => {
        const {valid,error} = validateData(name,value)
        let formvalid = true;
        /*if(state.firstName.valid === true && state.lastName.valid === true && state.email.valid === true && state.password.valid === true && state.confirmpassword.valid === true)
            formvalid = true;*/
        for(const key in info)
        {
            console.log(key+" : "+info[key].valid )
            if(info[key].valid === false)
            {
                formvalid = false;
                break;
            }
        }  
        console.log(formvalid)  
        dispatch({type: 'update', data: {name,value,touched: true, valid, error,formvalid} })
    }

    const onFocusout = (name,value) => {
        const {valid,error} = validateData(name,value)
        let formvalid = true;
       // if(state.firstName.valid === true && state.lastName.valid === true && state.email.valid === true && state.password.valid === true && state.confirmpassword.valid === true)
            formvalid = true;
        for(const key in info)
        {
            console.log(key+" : "+info[key].valid )
            if(info[key].valid === false)
            {
                formvalid = false;
                break;
            }
        }  
        dispatch({type: 'update', data: {name,value,touched: true, valid, error,formvalid} })
    }


        const [info,dispatch]=useReducer(reducer,init);
        //const [msg,setMsg]=useState("");
        const navigate= useNavigate();

        const sendData=(e) =>{
            e.preventDefault();

            const reqOptions={
                method:'POST',
                mode: 'cors',
                headers:{'content-type':'application/json'},
                
                body:JSON.stringify({
                                   fname:info.fname.value,
                                    lname:info.lname.value,
                                    email:info.email.value,
                                    password:info.password.value,
                                    contact_no:info.contact_no.value,
                                    gender:info.gender.value,
                                    area:info.area.value,
                                    city:info.city.value,
                                    state:info.state.value,
                                    pincode:info.pincode.value,
                                    role_id:info.role_id.value,
                                    question_id:info.question_id.value,
                                    answer:info.answer.value,
                                    qualification:info.qualification.value,
                                    specialization:info.specialization.value,
                                    experience:info.experience.value,
                                    imr_no:info.imr_no.value,  
                                    department:info.department.value,
                                    type:info.type.value})
            }
            fetch("http://localhost:8080/registerDoctor",reqOptions)
            .then(resp=>{
                console.log("data send");
                alert("Registration Successful...");
                navigate("/adminhome");

            });                                        
        }

    return(
        <div className="doc">
            <br/>
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" >
                      <div class="card-body p-5">
                        <h2 class="text-uppercase text-center mb-5">Doctor Registration Form</h2>
        
        <form action="">
            <div class="mb-3 mt-3">
                <label for="fname" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="fname" placeholder="Enter first name..."  name="fname" value={info.fname.value}
            
                onChange={(e)=>handleChange("fname",e.target.value)}/>
                <div className="error-msg"> {info.fname.error}</div> 
                
            </div>

            <div class="mb-3">
                <label for="lname" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="lname" placeholder="Enter last name..."  name="lname" value={info.lname.value}
               
                onChange={(e)=>handleChange("lname",e.target.value)}/>
                <div className="error-msg"> {info.lname.error}</div> 
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email..."  name="email" value={info.email.value}
                 
                 onChange={(e)=>handleChange("email",e.target.value)}/>
                 <div className="error-msg"> {info.email.error}</div> 
            </div>

            <div class="mb-3">
                <label for="contact_no" class="form-label">Contact No.:</label>
                <input type="text" class="form-control" id="contact_no" placeholder="Enter contact no..."  name="contact_no" value={info.contact_no.value}
                
                onChange={(e)=>handleChange("contact_no",e.target.value)}/>
                <div className="error-msg"> {info.contact_no.error}</div> 
            </div>

            <div class="mb-3">
                <label class="form-label" for="gender"> Gender :- </label>
                <input class="form-check-input" type="radio" name="gender" id="gender" value="Male"
                   onChange={(e)=>dispatch({type: 'update', data: {name:"gender",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Male
                
                <input class="form-check-input" type="radio" name="gender" id="gender" value="Female"
                    onChange={(e)=>dispatch({type: 'update', data: {name:"gender",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Female
                  
                    
            </div>

            <div class="mb-3">
                <label for="qualification" class="form-label">Qualification :</label>
                <input type="text" class="form-control" id="qualification" placeholder="Enter qualification" name="qualification" value={info.qualification.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"qualification",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="specialization" class="form-label">Specialization :</label>
                <input type="text" class="form-control" id="specialization" placeholder="Enter specialization" name="specialization" value={info.specialization.value}
                  onChange={(e)=>dispatch({type: 'update', data: {name:"specialization",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="imr_no" class="form-label">IMR no :</label>
                <input type="text" class="form-control" id="imr_no" placeholder="Enter imr_no" name="imr_no" value={info.imr_no.value}
                  onChange={(e)=>dispatch({type: 'update', data: {name:"imr_no",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="department" class="form-label">Department :</label>
                <input type="text" class="form-control" id="department" placeholder="Enter department" name="department" value={info.department.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"department",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="docType" class="form-label">Type :</label>
                <input type="text" class="form-control" id="docType" placeholder="Enter type of doctor..." name="docType" value={info.type.value}
                  onChange={(e)=>dispatch({type: 'update', data: {name:"type",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>
            <div class="mb-3">
                <label for="area" class="form-label">Area:</label>
                <input type="text" class="form-control" id="area" placeholder="Enter area..." name="area" value={info.area.value}
                  onChange={(e)=>dispatch({type: 'update', data: {name:"area",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="city" class="form-label">City:</label>
                <input type="text" class="form-control" id="city" placeholder="Enter city" name="city" value={info.city.value} minLength='2'
                 onChange={(e)=>dispatch({type: 'update', data: {name:"city",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="state" class="form-label">State:</label>
                <input type="text" class="form-control" id="state" placeholder="Enter state..." name="state" value={info.state.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"state",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="pincode" class="form-label">Pincode:</label>
                <input type="text" class="form-control" id="pincode" placeholder="Enter pincode" name="pincode" value={info.pincode.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"pincode",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password.:</label>
                <input type="password" class="form-control" id="password" placeholder="Enter password"  name="password" value={info.password.value}
                 
                 onChange={(e)=>handleChange("password",e.target.value)}/>
                 <div className="error-msg"> {info.password.error}</div> 
            </div>

            <div class="mb-3">
                 <label for="cpassword" class="form-label">Confirm Password.:</label>
                <input type="password"  class="form-control" id="cpassword" placeholder="Enter Confirm password"   name="cpassword" 
                       
                       
                        onChange={(e)=> handleChange("cpassword", e.target.value)}
                        onBlur={(e)=> onFocusout("cpassword", e.target.value)} />

                        <div className="error-msg"> {info.cpassword.error}</div>  
                                  
                </div>


            <div class="mb-3">
                <label class="form-label" for="question_id"> Security Question :- </label>
                <select class="form-control" id="question_id" name="question_id"
                 onChange={(e)=>dispatch({type: 'update', data: {name:"question_id",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })} >
                    <option value="0">Select</option>
                    <option value="1">What is your nickname ?</option>
                    <option value="2">What is your native place ?</option>
                    <option value="3">What is your favourite movie ? </option>
                    <option value="4">Who is your favourite actor ? </option>
                    <option value="5">What is your favourite color ? </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="answer" class="form-label">Answer:</label>
                <input type="text" class="form-control" id="answer" placeholder="Enter answer..."  name="answer" value={info.answer.value}
                onChange={(e)=>dispatch({type: 'update', data: {name:"answer",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            
            <button type="submit" class="btn btn-primary" onClick={(e)=>{sendData(e)}}>Submit</button>  
            <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
            <button type="reset" class="btn btn-primary" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
        </form>
        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        {/* <p>{JSON.stringify(info)}</p>  */}
        
        </div>

    )
}
