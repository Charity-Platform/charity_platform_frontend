import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaUser, FaLock, FaMousePointer } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  const [activeTab, setActiveTab] = useState("signin");
  const [showVerification, setShowVerification] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [activationCode, setActivationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from Auth context

  // Handle Signup
  const handleSignup = async (event) => {
    event.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("يرجى إدخال كل من البيانات لتسجيل حساب.");
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/signup`,
        { name, email, phone, password },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 200) {
        toast.success('تم تسجيل حساب جديد بنجاح');
        setShowVerification(true);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);

    } finally {
      setIsLoading(false);
    }
  };

  // Handle Activation
  const handleActivation = async (event) => {
    event.preventDefault();
    if (!activationCode) {
      setErrorMessage("يرجى إدخال رمز التفعيل.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/verify-email`,
        { emailVerifyCode: activationCode },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("تم التفعيل بنجاح");
        setShowVerification(false);  // Hide verification form
        setActiveTab("signin");  // Show login form
       
      } else {
        setErrorMessage("الرمز غير صحيح. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);

    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend Code
  const handleResendCode = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/resend-code`,
        { email }
      );
      if (response.status === 200) {
        toast.success('تم إرسال الكود بنجاح.');
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);

    }
  };

  // Handle Login
  const handleLogin = async (event) => {
    event.preventDefault();
 
    setIsLoading(true);
    setErrorMessage("");
    try {
      await login(email, password); // Use login from context
      navigate('/dashBoard'); // Navigate after successful login
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (event) => {
    event.preventDefault();
    if (!email) {
      setErrorMessage("يرجى إدخال بريدك الإلكتروني.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/forgot-password`,
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 200) {
        toast.success('تم ارسال الكود بنجاح');
        navigate("/activePass");
      }
    } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // // Handle Error Response
  // const handleErrorResponse = (error) => {
  //   console.error("Error:", error.response ? error.response.data : error.message);
  //   setErrorMessage("حدث خطأ. حاول مرة أخرى.");
  //   toast.error("حدث خطأ. حاول مرة أخرى.");
  // };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">مرحبا بكم !</h2>

          {!showVerification ? (
            <>
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "signin" ? "active" : ""}`}
                    onClick={() => setActiveTab("signin")}>دخول</button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "register" ? "active" : ""}`}
                    onClick={() => setActiveTab("register")}>حساب جديد</button>
                </li>
                <li className="nav-item">
                  <button className={`nav-link ${activeTab === "forgotpassword" ? "active" : ""}`}
                    onClick={() => setActiveTab("forgotpassword")}>نسيت كلمة السر</button>
                </li>
              </ul>

              <div className="tab-content mt-4">
                {activeTab === "signin" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit={handleLogin}>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaEnvelope /></span>
                          <input type="email" className="form-control" placeholder="البريد الإلكتروني"
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaLock /></span>
                          <input type="password" className="form-control" placeholder="كلمة المرور"
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <p className="mt-1" dir="rtl">
                          <a href="#forgotpassword" className="hashtag"
                            onClick={() => setActiveTab("forgotpassword")}>نسيت كلمة السر؟</a>
                        </p>
                      </div>
                      <div className="text-center button-signup">
                        <button className="btn btn-primary btn-block mb-2" type="submit">
                          <FaMousePointer className="mr-2 icone" /> دخول
                        </button>
                      </div>
                      <p className="text-center mt-3">
                        إذا لم يكن لديك حساب <a href="#register" className="hashtag"
                          onClick={() => setActiveTab("register")}>عمل حساب جديد</a>
                      </p>
                    </form>
                  </div>
                )}

                {activeTab === "register" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit={handleSignup}>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaUser /></span>
                          <input type="text" className="form-control" placeholder="الاسم الكامل"
                            onChange={(e) => setName(e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaEnvelope /></span>
                          <input type="email" className="form-control" placeholder="البريد الإلكتروني"
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaPhone /></span>
                          <input type="text" className="form-control" placeholder="رقم الجوال"
                            onChange={(e) => setPhone(e.target.value)} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaLock /></span>
                          <input type="password" className="form-control" placeholder="كلمة المرور"
                            onChange={(e) => setPassword(e.target.value)} />
                        </div>
                      </div>
                      <div className="text-center button-signup">
                        <button className="btn btn-primary btn-block mb-2" type="submit">
                          <FaMousePointer className="mr-2 icone" /> عمل حساب
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "forgotpassword" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit={handleForgotPassword}>
                      <div className="mb-3">
                        <div className="input-group">
                          <span className="input-group-text"><FaEnvelope /></span>
                          <input type="email" className="form-control" placeholder="البريد الإلكتروني"
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="text-center button-signup">
                        <button className="btn btn-primary btn-block mb-2" type="submit">
                          <FaMousePointer className="mr-2 icone" /> استعادة كلمة المرور
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="tab-content mt-4">
                <div className="tab-pane fade show active">
                  <form onSubmit={handleActivation}>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text"><FaEnvelope /></span>
                        <input type="text"  className="form-control" placeholder="رمز التفعيل"
                          onChange={(e) => setActivationCode(e.target.value)} />
                      </div>
                    </div>
                    <div className="text-center button-signup">
                      <button className="btn btn-primary btn-block mb-2" type="submit">
                        <FaMousePointer className="mr-2 icone" /> تفعيل الحساب
                      </button>
                      <p className="mt-2">
                        لم يصلك الرمز؟ <a href="#resendcode" onClick={handleResendCode}>أرسل مرة أخرى</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
