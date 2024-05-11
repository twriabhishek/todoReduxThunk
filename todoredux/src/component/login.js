import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [logindetails, setLogindetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogindetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindetails),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(response.status, data);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/todo");
        }, 500);
      } else if (response.status === 400) {
        console.log(response.status);
        toast.error("All fields are required");
      } else if (response.status === 404) {
        console.log(response.status);
        toast.error("User Not found");
      } else if (response.status === 401) {
        console.log(response.status);
        toast.error("Invalid Password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <section class="vh-100" style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="card" style={{ borderRadius: "1rem" }}>
            <div class="row d-flex justify-content-center">
              <div class="col-md-6 d-flex align-items-center">
                <div class="card-body py-4 text-black">
                  <form>
                    <div class="text-center mb-3 pb-1">
                      <span class="h1 fw-bold mb-0">Login</span>
                      <hr className="hr w-50 mx-auto" />
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label required" for="email">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        class="form-control form-control-lg"
                        placeholder="Enter Email address..."
                        name="email"
                        value={logindetails.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div data-mdb-input-init class="form-outline mb-4">
                      <label class="form-label required" for="form2Example27">
                        Password
                      </label>
                      <input
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                        placeholder="Enter Password..."
                        name="password"
                        value={logindetails.password}
                        onChange={handleChange}
                      />
                    </div>

                    <div class="pt-1 mb-4">
                      {/* <!-- Submit button --> */}
                      <div class="d-grid">
                        <button class="btn btn-dark" onClick={handleLogin}>
                          Login
                        </button>
                      </div>
                    </div>

                    <a class="small text-muted" href="#!">
                      Forgot password?
                    </a>
                    <p class="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                      Don't have an account?{" "}
                      <Link to="/signup" style={{ color: "#393f81" }}>
                        Register here
                      </Link>
                    </p>
                  </form>
                </div>
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
