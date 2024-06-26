import React, { useState } from "react";
import "./Login.scss";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye1 from "../../assets/eye1.png";
import eye2 from "../../assets/eye2.png";
import { ImSpinner2 } from "react-icons/im";
import { useTranslation, Trans } from "react-i18next";
import axios from "../../utils/AxiosConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) {
      toast.error("Username is empty!");
      return;
    }
    if (!password) {
      toast.error("Password is empty!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/auth/user/login", {
        username,
        password,
      });

      // Handle success
      if (res && res.status === 200) {
        setIsLoading(false);
        navigate("/");
        toast.success(res.data);
        console.log(res);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed:", error);
      if (error && error.response && error.response.status === 401) {
        toast.error("Incorrect password!");
      } else if (error && error.response && error.response.status === 404) {
        toast.error("User not found!");
      } else {
        toast.error("Unexpected error occurred!");
      }
    }
  };

  const goToHome = () => {
    navigate("/");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-content">
          <div className="login-form">
            <div className="login-form-body">
              <div>
                <div className="login-form-input">
                  <label>Tài khoản</label>
                  <input
                    type="text"
                    placeholder="hminhhoangdev@gmail.com"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="login-form-input">
                  <label>Mật khẩu</label>
                  <input
                    type={hidePassword ? "password" : "text"}
                    placeholder="Ít nhất 8 ký tự"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                  />

                  {hidePassword ? (
                    <img
                      src={eye1}
                      className="eye"
                      alt="Hide Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  ) : (
                    <img
                      src={eye2}
                      className="eye"
                      alt="Show Password"
                      onClick={() => {
                        handleHidePassword();
                      }}
                    />
                  )}
                </div>
                <p>Quên mật khẩu?</p>
                <div className="btn-login">
                  <button
                    onClick={() => {
                      handleLogin();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading === true && (
                      <ImSpinner2 className="loaderIcon" />
                    )}
                    Đăng nhập vào Gearvn
                  </button>
                </div>

                <div className="br">
                  <span>Hoặc</span>
                </div>

                <div className="bg-login-or">
                  <div className="google">
                    <img src={google} alt="gg" />
                    <p>Đăng nhập với Google</p>
                  </div>
                  <div className="facebook">
                    <img src={facebook} alt="fb" />
                    <p>Đăng nhập với Facebook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
