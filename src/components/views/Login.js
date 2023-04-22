import { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "../../utilities/Forms";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
// import { Navbar } from "./components/views/Navbar";
import { FacebookLoginButton } from "react-social-login-buttons";
import { InstagramLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Dropdown from "react-bootstrap/Dropdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bForm from 'react-bootstrap/Form';

const client_id =
  "299065018954-6o458210krpn4slslu8g10j6p1pbphcl.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");

  const navigate = useHistory();

  // const coursesPage = () => {
  //     history.push("/login")
  // }

  const captchaRef = useRef(null);

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId:
          "299065018954-6o458210krpn4slslu8g10j6p1pbphcl.apps.googleusercontent.com",
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
      userType: {
        value: userType,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });
    console.log(validator,"validate")
    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const authenticate = (e) => {
    e.preventDefault();
    console.log(userType, "yser type test");

    const validate = validateLogin();
    

    if (validate) {
      console.log(userType,"user type")
    axios
      .post("https://se-event-management.azurewebsites.net/user/check", {
        Email: email,
        Password: password,
        VenueOwner: userType=="admin"?true:false
      })
      // .then((data) => data)
      .then((response) => {
        sessionStorage.clear();

        if (response?.status === 200 && response?.data.email) {
          sessionStorage.setItem("userDetails", JSON.stringify(response.data));
          navigate.push("/Events");
        } else {
          alert("invalid credentials");
          toast.error('Success Notification !', {
            position: toast.POSITION.TOP_RIGHT
        });
        }
      });
    }
  };

  const onRecaptchaChange = (value) => {};
  // NEWLY ADDED
  //   const handleSubmit = async e => {
  //     e.preventDefault();
  //     setError('');
  //     setMessage('');
  //     if(email && password){
  //     let token = captchaRef.current.getValue();
  //     if(token){
  //         let valid_token = await verifyToken(token);
  //         if(valid_token.success){
  //         setMessage("Hurray!! you have submitted the form");
  //         }else{
  //         setError("Sorry!! Token invalid");
  //         }
  //     }else{
  //         setError("You must confirm you are not a robot");
  //     }
  //     }else{
  //     setError("email and password are required");
  //     }
  //  };

  //  const verifyToken = async (token) => {
  //   try{
  //   let response = await axios.post(`http://localhost:4000/verify-token`,{

  // secret:process.env.REACT_APP_SECRET_KEY,
  //       token
  //   },console.log(token));
  //   return response.data;
  //   }catch(error){
  //   console.log("error ",error);
  //   }
  // };

  //  NEWLY ADDED

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  //oAuth
  const onSuccess = (res) => {
    axios
      .post("https://se-event-management.azurewebsites.net/user/check", {
        Email: email,
        Password: password,
      })
      // .then((data) => data)
      .then((response) => {
        sessionStorage.clear();

        if (response?.status === 200 && response?.data.email) {
          sessionStorage.setItem("userDetails", JSON.stringify(response.data));
          navigate.push("/Events");
        }
        // else {
        //   alert("Error");
        // }
      });
  };
  const onFailure = (res) => {
    // console.log("login fail", res);
  };

  const userTypeFun = (e) => {
    setUserType(e.target.value);
  };
  //Oauth

  return (
    <div>
      <Navbar />
      <div className="row g-0 auth-wrapper">
        <div className="col-12 col-md-12 col-lg-12 auth-main-col text-center">
          <div className="d-flex flex-column align-content-end">
            <div className="auth-body mx-auto">
              <p>Login to your account</p>
              <div className="auth-form-container text-start">
                <form
                  className="auth-form"
                  method="POST"
                  onSubmit={authenticate}
                  autoComplete={"off"}
                >
                  <div className="email mb-3">
                    {/* <Dropdown value={userType} onChange = {(e)=>userTypeFun(e)} >
                      <Dropdown.Toggle
                        variant="success"
                        id="dropdown-basic"
                        style={{ backgroundColor: "#12203a", color: "white" }}
                      >
                        Admin/User
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>Admin</Dropdown.Item>
                        <Dropdown.Item>User</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                    <div style={{marginBottom:"10px"}}>
                      <bForm.Select
                      
                        onChange={(e) => userTypeFun(e)}
                        name="userType"
                        id="userType"
                        style={{backgroundColor:"gainsboro"}}
                      >
                        <option value="">Admin/User</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </bForm.Select>

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.userType
                            ? "d-block"
                            : "d-none"
                        }`}
                      >
                        {validate.validate && validate.validate.userType
                          ? validate.validate.userType[0]
                          : ""}
                      </div>
                    </div>

                    <input
                      type="email"
                      className={`form-control ${
                        validate.validate && validate.validate.email
                          ? "is-invalid "
                          : ""
                      }`}
                      id="email"
                      name="email"
                      value={email}
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.email
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.email
                        ? validate.validate.email[0]
                        : ""}
                    </div>
                  </div>

                  <div className="password mb-3">
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          validate.validate && validate.validate.password
                            ? "is-invalid "
                            : ""
                        }`}
                        name="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={(e) => togglePassword(e)}
                      >
                        <i
                          className={
                            showPassword ? "far fa-eye" : "far fa-eye-slash"
                          }
                        ></i>{" "}
                      </button>

                      <div
                        className={`invalid-feedback text-start ${
                          validate.validate && validate.validate.password
                            ? "d-block"
                            : "d-none"
                        }`}
                      >
                        {validate.validate && validate.validate.password
                          ? validate.validate.password[0]
                          : ""}
                      </div>
                    </div>
                    <br />
                    <div className="formGroup">
                      <ReCAPTCHA
                        sitekey="6LffFXEkAAAAAAuTtmg_OKXkC7MI07-50OyeoBdb"
                        ref={captchaRef}
                        onChange={onRecaptchaChange}
                      />
                    </div>

                    <div className="extra mt-3 row justify-content-between">
                      <div className="col-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={(e) =>
                              setRemember(e.currentTarget.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="remember"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="forgot-password text-end">
                          <Link to="/forgot-password">Forgot password?</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <button
                      // onClick={login}
                      type="submit"
                      className="btn btn-primary w-100 theme-btn mx-auto"
                    >
                      Log In
                    </button>
                  </div>
                </form>

                <hr />
                <div>
                  <GoogleLogin
                    clientId="299065018954-6o458210krpn4slslu8g10j6p1pbphcl.apps.googleusercontent.com"
                    buttonText="Login using Google Accont"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    // cookiePolicy={"single_host_origin"}
                    isSignedIn={true}
                  />
                </div>

                <div className="auth-option text-center pt-2">
                  No Account?{" "}
                  <Link className="text-link" to="/register">
                    Sign up{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
