import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Form from "../../utilities/Forms";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [UserDescription, setUserDescription] = useState("");
  const [Age, setAge] = useState("");

  const navigate = useHistory();

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
      lastname: {
        value: lastname,
        isRequired: true,
      },
      username: {
        value: username,
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

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      setName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setAge("");
      setUserDescription("");
      alert("Successfully Register User");
    }

    axios
      .post("https://se-event-management.azurewebsites.net/User/create", {
        Email: email,
        Password: password,
        FirstName: name,
        LastName: lastname,
        UserName: username,
        Age: Age,
        UserDescription: UserDescription,
      })
      // .then((data) => data)
      .then((response) => {
        console.log(response, "api response post");
        // if (response?.status === 200 && response?.data) {
        //   navigate.push("/landing");
        // }
      });
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="row g-0 auth-wrapper">
      {/* //   <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
    //     <div className="auth-background-holder"></div>
    //     <div className="auth-background-mask"></div>
    //   </div> */}

      <div className="col-12 col-md-12 col-lg-12 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Create your Account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                method="POST"
                onSubmit={register}
                autoComplete={"off"}
              >
                <div className="name mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="name"
                    name="name"
                    value={name}
                    placeholder="First Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <br></br>

                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="lastname"
                    name="name"
                    value={lastname}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <br></br>
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="username"
                    name="name"
                    value={username}
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br></br>
                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.name
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.name
                      ? validate.validate.name[0]
                      : ""}
                  </div>

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.name
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.name
                      ? validate.validate.name[0]
                      : ""}
                  </div>

                  <div>
                      <input
                        type="text"
                        className="form-control"
                        id="Age"
                        name="Age"
                        value={Age}
                        placeholder="Enter your age"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <br></br>
                    </div>

                    <div>
                      <input
                        type="text"
                        className="form-control"
                        id="UserDescription"
                        name="UserDescription"
                        value={UserDescription}
                        placeholder="Brief description about your interests"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                </div>

                <div className="email mb-3">
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
                    <br></br>
                   
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
