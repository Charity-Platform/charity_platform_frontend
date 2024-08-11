import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaLock,
  FaMousePointer,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import axios from "axios";
import Loading from "./Loading";

// function for login
const Login = () => {
  const [activeTab, setActiveTab] = useState("signin");

  // state for sign up

  const [showVerification, setShowVerification] = useState(false); // لإظهار أو إخفاء صفحة التحقق
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://charity-platform-backend.onrender.com/api/auth/signup",
        {
          name: name,
          email: email,
          phone: phone,
          password: password,
        }
      );
      console.log(response.data);
      setShowVerification(true); // إظهار صفحة التحقق
      // navigate('/verify-email'); // يمكنك استخدام التنقل إذا أردت الانتقال إلى صفحة جديدة
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData) {
          let message = "";
          if (errorData.name) message += `خطأ في الاسم: ${errorData.name}\n`;
          if (errorData.email)
            message += `خطأ في البريد الإلكتروني: ${errorData.email}\n`;
          if (errorData.phone) message += `خطأ في الهاتف: ${errorData.phone}\n`;
          if (errorData.password)
            message += `خطأ في كلمة المرور: ${errorData.password}\n`;
          alert(message || "حدث خطا حاول التأكد من البيانات ");
        } else {
          alert("حدث خطا حاول التأكد من البيانات ");
          setIsLoading(false);
        }
      }
    } finally {
      setIsLoading(false); // إيقاف التحميل
    }
  };

  // activate email code
  const [activationCode, setActivationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
 

  const handleActivation = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!email || !activationCode) {
      setErrorMessage("يرجى إدخال كل من البريد الإلكتروني ورمز التفعيل.");
      return;
    }

    try {
      const response = await axios.post(
        "https://charity-platform-backend.onrender.com/api/auth/verify-email",
        {
          email: email, // تأكد من إرسال البريد الإلكتروني الصحيح
          code: activationCode, // تأكد من إرسال الكود الصحيح
        }
      );
    
   
      console.log(response.data);

      if (response.status === 200) {
        setIsVerified(true);
        window.location.href = "/login"; // التحويل بعد نجاح التحقق فقط
      } else {
        setErrorMessage("الرمز غير صحيح. حاول مرة أخرى.");
      }
    } catch (error) {
      console.error(
        "Error during activation:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("حدث خطأ في عملية التحقق. حاول مرة أخرى.");
     }
  };


  //resend verification code 

  const handelresendcode =async (event)=>{
   event.preventDefault();

   try{
    const response = await axios.post('https://charity-platform-backend.onrender.com/api/auth/resend-code',{
      email : email
    });
      // تحقق مما إذا كانت عملية إعادة الإرسال ناجحة
      if (response.status === 200) {
        alert('تم إرسال الكود بنجاح.');
      } else {
        alert('لم يتم إرسال الكود. حاول مرة أخرى.');
      }

   }catch(error){
     alert('حاول ارسال الكود مره اخرى ' , error.response ? error.response.data : error.message);
   }
  
  
  
  }


  // login handel 

  const handelLogin =async (event)=>{
   event.preventDefault();
   setIsLoading(true);
   try {
     const response = await axios.post(
       "https://charity-platform-backend.onrender.com//api/auth/login",
       {
         email: email,
         password: password,
       }
     );
     if (response.status === 200) {
      
      window.location.href = "/services"; // التحويل بعد نجاح التحقق فقط
    } else {
      setErrorMessage("توجد مشكله تأكد من ان لديك حساب فى المنصة ");
    }
  } catch(error){
    alert('مشكله ف البريد الالكترونى او الباسورد تأكد من تسجيل حساب ' ,error);

  }
}
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {isLoading ? (
        <Loading /> // عرض مؤشر التحميل أثناء انتظار الاستجابة
      ) : (
        <div
          className="card p-4 shadow-lg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="text-center mb-4">مرحبا بكم !</h2>

          {!showVerification ? (
            <>
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "signin" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("signin")}
                  >
                    دخول
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "register" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("register")}
                  >
                    حساب جديد
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${
                      activeTab === "forgotpassword" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("forgotpassword")}
                  >
                    نسيت كلمة السر
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-4">
                {activeTab === "signin" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit={handelLogin}>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaEnvelope />
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="البريد الإلكترونى "
                            onChange={(e)=>setemail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaLock />
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="الرقم السرى الخاص بك "
                            onChange={(e)=>setpassword(e.target.value)}
                          />
                        </div>
                        <p className="mt-1" dir="rtl">
                          <a
                            href="#forgotpassword"
                            className="hashtag"
                            onClick={() => setActiveTab("forgotpassword")}
                          >
                            نسيت كلمة السر ؟
                          </a>
                        </p>
                      </div>
                      <div className="text-center button-signup">
                        <button
                          className="btn btn-primary btn-block mb-2"
                          type="submit"
                        >
                          <FaMousePointer className="mr-2 icone" /> دخول
                        </button>
                      </div>
                      <p className="text-center mt-3">
                        إذا لم يكن لديك حساب{" "}
                        <a
                          href="#register"
                          className="hashtag"
                          onClick={() => setActiveTab("register")}
                        >
                          عمل حساب جديد
                        </a>
                      </p>
                    </form>
                  </div>
                )}

                {activeTab === "register" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit={handleSignup}>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaUser />
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="الاسم "
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaEnvelope />
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="البريد الإلكترونى "
                            required
                            onChange={(e) => setemail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaPhone />
                            </span>
                          </div>
                          <input
                            type="phone"
                            className="form-control"
                            placeholder="رقم التليفون "
                            onChange={(e) => setphone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaLock />
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="الرقم السرى الخاص بك"
                            onChange={(e) => setpassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-center button-signup">
                        <button
                          className="btn btn-primary btn-block mb-2"
                          type="submit"
                        >
                          <FaMousePointer className="mr-2 icone" /> تسجيل حساب
                          جديد
                        </button>
                      </div>
                      <p className="text-center mt-3">
                        أنا بالفعل لدي حساب{" "}
                        <a
                          href="#signin"
                          className="hashtag"
                          onClick={() => setActiveTab("signin")}
                        >
                          تسجيل الدخول
                        </a>
                      </p>
                    </form>
                  </div>
                )}

                {activeTab === "forgotpassword" && (
                  <div className="tab-pane fade show active">
                    <form onSubmit="">
                      <div className="mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <FaEnvelope />
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="أدخل بريدك الإلكتروني"
                            value={emailactiv}
                            onChange={(e) => setEmailactiv(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="text-center button-signup">
                        <button
                          className="btn btn-primary btn-block mb-2"
                          type="submit"
                        >
                          <FaMousePointer className="mr-2 icone" /> إرسال رمز
                          التحقق
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="tab-pane fade show active">
              <h2 className="text-center mb-4">تحقق من بريدك الإلكتروني</h2>
              <form onSubmit={handleActivation}>
                <div className="mb-3">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="أدخل رمز التحقق"
                      value={activationCode}
                      onChange={(e) => setActivationCode(e.target.value)}
                      required

                    />
                  </div>
                </div>
                <div className="text-center button-signup">
                  <button
                    className="btn btn-primary btn-block mb-2"
                    type="submit"
                  >
                    <FaMousePointer className="mr-2 icone" /> تأكيد
                  </button>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  <p className="cursor:pointer" role="button" onClick={handelresendcode}>
                    إعادة إرسال الكود ؟{" "}
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
