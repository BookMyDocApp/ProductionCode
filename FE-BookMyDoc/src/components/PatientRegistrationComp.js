import { useReducer , useState} from "react";
import {  useNavigate } from "react-router-dom";

export default function PatientRegistrationComp(){

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
        role_id:{value:"",touched:false,valid:false,error:""},//
        question_id:{value:"",touched:false,valid:false,error:""},
        answer:{value:"",touched:false,valid:false,error:""},
        birthdate:{value:"",touched:false,valid:false,error:""},
        blood_group:{value:"",touched:false,valid:false,error:""},
        diabetes:{value:"",touched:false,valid:false,error:""},
        blood_pressure:{value:"",touched:false,valid:false,error:""}
        
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
                                error = "First letter should be Capital"
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
                                error = "contact no do not match"
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

    const navigate= useNavigate();

    const reducer=(state,action)=>  {
        switch(action.type)
        {
            case 'update':
               // return {...state,[action.fld]:action.val}
               const {name, value, touched, valid,error,formvalid} = action.data
                
                return {...state, [name]: {value, touched, valid, error}, formvalid }
            case 'reset':
                return init;
        }
        
    }
    const handleChange = (name,value) => {
        const {valid,error} = validateData(name,value)
        let formvalid = true;
        
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
                   birthdate:info.birthdate.value,
                   blood_group:info.blood_group.value,
                   diabetes:info.diabetes.value,
                   blood_pressure:info.blood_pressure.value
                })
            }
            fetch("http://localhost:8080/registerPatient",reqOptions)
            .then(resp=>{if(resp.ok){
                            console.log("data send");
                            alert("Registration Successful...");
                            navigate("/login");
                            }
                            else{
                                alert("Registration failed...");


                            }
                        })
            
        }


       
    return(
        <div className="pat">
            <br/>
            <p className="pat1">
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
              <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                    <div class="card" >
                      <div class="card-body p-5">
                   
                        <h2 class="text-uppercase text-center mb-5">Patient Registration Form</h2>
        
        <form action="" className="pat1">
            <div class="mb-3 mt-3 ">
                <label for="fname" class="form-label">First Name:</label>
                <input type="text" class="form-control" id="fname" placeholder="Enter first name..." name="fname" value={info.fname.value}
               // onChange={(e)=>{dispatch({type:'update',fld:'fname',val:e.target.value})}}/>
               onChange={(e)=>handleChange("fname",e.target.value)}/>
               <div className="error-msg" style={{color:"red"}}> {info.fname.error}</div> 
            </div>

            <div class="mb-3">
               
                <label for="lname" class="form-label">Last Name:</label>
                <input type="text" class="form-control" id="lname" placeholder="Enter last name..." name="lname" value={info.lname.value}
                // onChange={(e)=>{dispatch({type:'update',fld:'lname',val:e.target.value})}}/>
                onChange={(e)=>handleChange("lname",e.target.value)}/>
                <div className="error-msg"  style={{color:"red"}} >  {info.lname.error}</div> 

            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email..." name="email" value={info.email.value}
                // onChange={(e)=>{dispatch({type:'update',fld:'email',val:e.target.value})}}/>
                onChange={(e)=>handleChange("email",e.target.value)}/>
                <div className="error-msg"> {info.email.error}</div> 
            </div>

            <div class="mb-3">
                <label for="contact_no" class="form-label">Contact No.:</label>
                <input type="text" class="form-control" id="contact_no" placeholder="Enter contact no..." name="contact_no" value={info.contact_no.value}
                // onChange={(e)=>{dispatch({type:'update',fld:'contactNo',val:e.target.value})}}/>
                onChange={(e)=>handleChange("contact_no",e.target.value)}/>
                <div className="error-msg"> {info.contact_no.error}</div> 
            </div>

            <div class="mb-3">
                <label class="form-label" for="gender"> Gender :- </label>
                <input class="form-check-input" type="radio" name="gender" id="gender" value="Male" required
                     onChange={(e)=>dispatch({type: 'update', data: {name:"gender",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Male


                <input class="form-check-input" type="radio" name="gender" id="gender" value="Female"
                     onChange={(e)=>dispatch({type: 'update', data: {name:"gender",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Female
            </div>

            <div class="mb-3">
                <label for="birthdate" class="form-label">BirthDate:</label>
                <input type="date" class="form-control" id="birthdate" placeholder="Enter birthdate..." name="birthdate" value={info.birthdate.value}
                  onChange={(e)=>dispatch({type: 'update', data: {name:"birthdate",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="blood_group" class="form-label">Blood Group:</label>
                <input type="text" class="form-control" id="blood_group" placeholder="Enter blood_group" name="blood_group" value={info.blood_group.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"blood_group",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label class="form-label" for="diabetes"> Diabetes :- </label>
                <input class="form-check-input" type="radio" name="diabetes" id="diabetes" value="Yes"
                    onChange={(e)=>dispatch({type: 'update', data: {name:"diabetes",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Yes
                <input class="form-check-input" type="radio" name="diabetes" id="diabetes" value="No"
                   onChange={(e)=>dispatch({type: 'update', data: {name:"diabetes",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> No
            </div>

            <div class="mb-3">
                <label class="form-label" for="blood_pressure"> Blood Pressure :- </label>
                <input class="form-check-input" type="radio" name="blood_pressure" id="bblood_pressure" value="Yes"
                    onChange={(e)=>dispatch({type: 'update', data: {name:"blood_pressure",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> Yes
                <input class="form-check-input" type="radio" name="blood_pressure" id="blood_pressure" value="No"
                   onChange={(e)=>dispatch({type: 'update', data: {name:"blood_pressure",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/> No
            </div>

            <div class="mb-3">
                <label for="area" class="form-label">Area:</label>
                <input type="text" class="form-control" id="area" placeholder="Enter area..." name="area" value={info.area.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"area",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            <div class="mb-3">
                <label for="city" class="form-label">City:</label>
                <input type="text" class="form-control" id="city" placeholder="Enter city" name="city" value={info.city.value}
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
                <input type="password" class="form-control" id="password" placeholder="Enter password" name="password" value={info.password.value}
                 //onChange={(e)=>{dispatch({type:'update',fld:'password',val:e.target.value})}}/>
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
                <select class="form-control" id="question_id" name="question_id" onChange={(e)=>dispatch({type: 'update', data: {name:"question_id",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })} >
                    <option value="0">Select Question</option>
                    <option value="1">What is your nickname ?</option>
                    <option value="2">What is your native place ?</option>
                    <option value="3">What is your favourite movie ? </option>
                    <option value="4">Who is your favourite actor ? </option>
                    <option value="5">What is your favourite color ? </option>
                </select>
            </div>

            <div class="mb-3">
                <label for="answer" class="form-label">Answer:</label>
                <input type="text" class="form-control" id="answer" placeholder="Enter answer..." name="answer" value={info.answer.value}
                 onChange={(e)=>dispatch({type: 'update', data: {name:"answer",value:e.target.value,touched: true, valid:true, error:"",formvalid:true} })}/>
            </div>

            
            <button type="submit" className="btn btn-primary btn-lg ms-2" onClick={(e)=>{sendData(e)}}>Submit</button>
            <button type="reset" className="btn btn-primary btn-lg ms-2" onClick={()=>{dispatch({type:'reset'})}}>Clear</button>
        </form>
        
        </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

        {/* <p>{JSON.stringify(info)}</p>  */}
</p>
        </div>

    )
}

