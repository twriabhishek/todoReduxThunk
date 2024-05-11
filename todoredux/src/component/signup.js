import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {endpoints} from '../ApiEndpoint.js';

const Signup = () => {
  const navigate = useNavigate();
  const [signupdetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(endpoints.signupAuth, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupdetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(response.status, data);
        toast.success("Register Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 400) {
        console.log(response.status);
        toast.error("User Already Exists");
      } else if (response.status === 404) {
        console.log(response.status);
        toast.error("Marked Fileds are required");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* <!-- Section: Design Block --> */}
      <section className="">
        <div
          className="px-4 py-5 px-sm-5  text-start"
          style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
        >
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="card">
                  <div class="text-center my-2">
                    <span class="h1 fw-bold mb-0">Register</span>
                    <hr className="hr w-50 mx-auto" />
                  </div>
                  <div className="card-body py-4 px-md-5">
                    <form>
                      {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <label
                              className="form-label required"
                              for="firstName"
                            >
                              First name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              className="form-control"
                              required
                              placeholder="Enter First Name.."
                              name="firstName"
                              value={signupdetails.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label required"
                              for="lastName"
                            >
                              Last name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              className="form-control"
                              required
                              placeholder="Enter Last Name.."
                              name="lastName"
                              value={signupdetails.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      {/* <!-- Email input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label required" for="email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          required
                          placeholder="Enter Email.."
                          name="email"
                          value={signupdetails.email}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <!-- Phone input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="phoneNumber">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phoneNumber"
                          className="form-control"
                          required
                          placeholder="Enter Phone Number.."
                          name="phoneNumber"
                          value={signupdetails.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <!-- Password input --> */}
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label required" for="password">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          required
                          placeholder="Enter Password.."
                          name="password"
                          value={signupdetails.password}
                          onChange={handleChange}
                        />
                      </div>

                      {/* <!-- Submit button --> */}
                      <div class="d-grid mb-4">
                        <button class="btn btn-dark" onClick={handleSignup}>
                          Sign up
                        </button>
                      </div>

                      <p class="mb-2 pb-lg-2" style={{ color: "#393f81" }}>
                      <Link to="/login" style={{ color: "#393f81" }}>
                          Click here{" "}
                        </Link>
                        to Login{" "}
                      </p>

                      {/* <!-- Register buttons --> */}
                      <div className="text-center">
                        <p>or sign up with:</p>
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-google"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>

                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-github"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  <Toaster />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
