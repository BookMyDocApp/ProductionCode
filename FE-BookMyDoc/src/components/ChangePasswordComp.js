import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordComp() {
  const email = localStorage.getItem("changePasswordEmail");

  const init = {
    password: { value: "", touched: false, valid: false, error: "" },
    cpassword: { value: "", touched: false, valid: false, error: "" },
    formvalid: false,
  };

  const validateData = (name, value) => {
    let valid = false;
    let error = "";
    switch (name) {
      case "password":
        var pattern =
          /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&])[A-Za-z0-9!@#$%^&*]{5,}$/;
        if (pattern.test(value)) {
          valid = true;
          error = "";
        } else {
          valid = false;
          error = "Password invalid";
        }
        break;

      case "cpassword":
        if (info.password.value === value) {
          valid = true;
          error = "";
        } else {
          valid = false;
          error = "Passwords do not match";
        }
        break;
    }
    return { valid, error };
  };

  const navigate = useNavigate();

  const reducer = (state, action) => {
    switch (action.type) {
      case "update":
        // return {...state,[action.fld]:action.val}
        const { name, value, touched, valid, error, formvalid } = action.data;

        return {
          ...state,
          [name]: { value, touched, valid, error },
          formvalid,
        };
      case "reset":
        return init;
    }
  };

  const handleChange = (name, value) => {
    const { valid, error } = validateData(name, value);
    let formvalid = true;

    for (const key in info) {
      console.log(key + " : " + info[key].valid);
      if (info[key].valid === false) {
        formvalid = false;
        break;
      }
    }
    console.log(formvalid);
    dispatch({
      type: "update",
      data: { name, value, touched: true, valid, error, formvalid },
    });
  };

  const [info, dispatch] = useReducer(reducer, init);

//   const setPassword = (e) => {
//     e.preventDefault();

//     const reqOptions = {
//       method: "POST",
//       mode: "no-cors",
//       headers: { "content-type": "application/json" },
//       body: info.password.value,
//     };
//     fetch("http://localhost:8080/changePassword/"+email,reqOptions)
//     .then(resp=>resp.json())
//     .then(obj=>{
//         if(obj)    //pending
//         {
//             alert("new password set sucessfully...")
//             navigate("/login")
//         }
//         else{
//             alert("new password set sucessfully...")
//             navigate("/login")
//         }
//     })


//   };

const setPassword = async (e) => {
    e.preventDefault();
  
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Correct the header field name
      body: JSON.stringify({ newPassword: info.password.value }), // Send the password as JSON data
    };
  
    try {
      const response = await fetch(
        "http://localhost:8080/changePassword/" + email,
        reqOptions
      );
  
      if (response.ok) {
        alert("New password set successfully...");
        navigate("/login");
      } else {
        const errorData = await response.json(); // Attempt to parse the response body
        console.error("Password change failed:", errorData);
        alert("Password change failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while changing the password. Please try again.");
    }
  };
  

  return (
    <div>
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Set New Password
                  </h2>
                  <form>
                    <div class="mb-3">
                      <label for="password" class="form-label">
                        Password.:
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Enter password"
                        name="password"
                        value={info.password.value}
                        onChange={(e) =>
                          handleChange("password", e.target.value)
                        }
                      />
                      <div className="error-msg" style={{ color: "red" }}>
                        {" "}
                        {info.password.error}
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="cpassword" class="form-label">
                        Confirm Password.:
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="cpassword"
                        placeholder="Enter Confirm password"
                        name="cpassword"
                        onChange={(e) =>
                          handleChange("cpassword", e.target.value)
                        }
                      />
                      <div className="error-msg" style={{ color: "red" }}>
                        {" "}
                        {info.cpassword.error}
                      </div>
                    </div>
                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button
                        type="submit"
                        class="btn btn-info btn-lg ms-2"
                        disabled={info.formvalid}
                        onClick={(e) => {
                          setPassword(e);
                        }}
                      >
                        Set Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
