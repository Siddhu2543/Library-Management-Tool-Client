import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <section
        class="vh-100"
        style={{
          backgroundImage:
            "url(https://asi.cs.fiu.edu/wp-content/uploads/sites/15/2016/06/Best-Study-Books-Photography-Wallpaper.jpeg)"
        }}
      >
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <h3 class="mb-2">Sign In</h3>
                  <p className="text-danger mb-5">
                    Enter your Admin Credentials
                  </p>

                  <div class="form-floating mb-4">
                    <input
                      type="text"
                      id="username"
                      class="form-control form-control-lg"
                      placeholder="Username"
                    />
                    <label class="form-label" for="username">
                      Username
                    </label>
                  </div>

                  <div class="form-floating mb-4">
                    <input
                      type="password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                    />
                    <label class="form-label" for="password">
                      Password
                    </label>
                  </div>

                  <div class="form-check mb-5 d-flex justify-content-start mb-4">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      id="remember"
                    />
                    <label class="form-check-label" for="remember">
                      Remember Me?
                    </label>
                  </div>

                  <button
                    class="btn btn-primary btn-lg btn-block"
                    type="button"
                  >
                    Login
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
