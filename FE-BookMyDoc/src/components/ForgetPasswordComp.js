import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordComp(){

    const init={
        que:{
            question_id:"",
            question:""
        },
        ans:""
    }

    const[email,setEmail]=useState("");
    const[questionAnswer,setQuestionAnswer]=useState(init);
    const[answer,setAnswer]=useState("");
    const navigate=useNavigate();

    const getQuestion=(e)=>{
        e.preventDefault();
        fetch("http://localhost:8080/getQuestionAnswer?email="+email)
        .then(resp=>resp.json())
        .then(obj=>{
            setQuestionAnswer(obj);
        })
    }

    const validateAnswer=(e)=>{
        e.preventDefault();
        if(answer===questionAnswer.ans)
        {
            localStorage.setItem("changePasswordEmail",email);
            navigate("/changePassword");
        }
        else{
            alert("Wrong Answer...")
        }
    }

    return(
        <div>
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
            
            <div class="container h-100">        
              <div class="row d-flex justify-content-center align-items-center h-100">          
                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div class="card" >
                    <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Forget Password</h2>
                    <form>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="email"><b> Email</b></label>
                                    <input type="email" id="email" placeholder="Enter email" name="email" value={email} class="form-control form-control-lg"
                                    onChange={(e)=>{setEmail(e.target.value)}} />
                                </div>

                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="submit" class="btn btn-info btn-lg ms-2" onClick={(e)=>{getQuestion(e)}}>Verify</button>
                                </div>

                                <div>
                                    <p>{questionAnswer.que.question}</p>
                                </div>
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="ans"><b> Answer</b></label>
                                    <input type="text" id="ans" placeholder="Enter answer" name="answer" class="form-control form-control-lg"
                                    onChange={(e)=>{setAnswer(e.target.value)}} />
                                </div>
                                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="submit" class="btn btn-info btn-lg ms-2" onClick={(e)=>{validateAnswer(e)}}>Submit</button>
                                </div>

                        </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <p>{email}</p>
            <p>{JSON.stringify(questionAnswer)}</p> 
            <p>{answer}</p> 
        </div>
    )
}