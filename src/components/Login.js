import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    const uname = document.getElementById("username");
    const pass = document.getElementById("password");
    if (uname.value === "") {
      setUsernameError("Please enter a username!");
    } else if (pass.value === "") {
      setUsernameError("");
      setPasswordError("Please enter a password!");
    } else {
      setUsernameError("");
      setPasswordError("");

      axios
        .post("https://localhost:7279/api/Admins/Login", {
          username: username,
          password: password,
        })
        .then(
          (res) => {
            const user = res.data;
            console.log(user);
            localStorage.setItem("USER", user);
            setUser(user);
            setError("");
          },
          (err) => {
            if (err.response.status === 404)
              setError("Invalid credentials! Please try again!");
            else setError("Something went wrong! Please try again!");
          }
        )
        .finally(() => {
          setUsername("");
          setPassword("");
        });
    }
  };

  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <section
        className="vh-100"
        style={{
          backgroundImage:
            "url(https://asi.cs.fiu.edu/wp-content/uploads/sites/15/2016/06/Best-Study-Books-Photography-Wallpaper.jpeg)",
        }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-2">Sign In</h3>
                  <p className="text-primary mb-5">
                    Enter your Admin Credentials
                  </p>

                  {error && <p className="text-danger mb-4">{error}</p>}
                  <div className="form-floating mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                  </div>
                  {usernameError != "" && (
                    <p className="text-danger mb-4">{usernameError}</p>
                  )}

                  <div className="form-floating mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>
                  {passwordError != "" && (
                    <p className="text-danger mb-4">{passwordError}</p>
                  )}
                  <div className="form-check mb-5 d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember Me?
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="button"
                    onClick={handleLogin}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Login;
