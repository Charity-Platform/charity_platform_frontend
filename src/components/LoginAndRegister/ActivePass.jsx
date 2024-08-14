import axios from 'axios';
import React, { useContext, useState } from 'react';
import { FaLock, FaMousePointer } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from 'react-router-dom';
import { User } from '../../Context/Context';

const ActivePass = () => {

    //  const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [activationCode, setActivationCode] = useState("");
    const navigate = useNavigate(); // لإعادة توجيه المستخدم
    const location = useLocation();
    const email = location.state?.email;
   const {auth} =useContext(User);
   

    const handleActivationpass = async (event) => {
        event.preventDefault();
        setErrorMessage("");
    
        if (!activationCode) {
          setErrorMessage("يرجى إدخال رمز التفعيل.");
          return;
        }
        setIsLoading(true);
        try {
          
          const response = await axios.post(
            "https://charity-platform-backend.onrender.com/api/auth/verify-reset-code",
            {
              
              resetCode: activationCode, 
            },
            {
                headers: {
                    Authorization: `Bearer ${auth?.token}`,
                },
            }
          );
        
            
          console.log('Token received:', response.data.token);
    
          if (response.status === 200) {
            console.log("done code activation for password");
            setIsVerified(true);
            navigate(`/rechangepass?token=${auth?.token}`); // التحويل بعد نجاح التحقق فقط
                          
          } else {
            setErrorMessage("الرمز غير صحيح. حاول مرة أخرى.");
          }
        } catch (error) {
          console.error(
            "Error during activation:",
            error.response ? error.response.data : error.message
          );
          setErrorMessage("حدث خطأ في عملية التحقق. حاول مرة أخرى.");
         }finally {
          setIsLoading(false);
        }
      };
    
        //resend verification code 
        const handleResendCode = async (event) => {
            event.preventDefault();
            setIsLoading(true);
            console.log("Email used for resending code:", email);  // Debugging line

            try {
                if (!email) {
                    throw new Error("Email is not defined.");
                }
                const response = await axios.post(
                    "https://charity-platform-backend.onrender.com/api/auth/resend-code",
                    { email }
                );
                if (response.status === 200) {
                    alert('تم إرسال الكود بنجاح.');
                } else {
                    setErrorMessage('لم يتم إرسال الكود. حاول مرة أخرى.');
                }
            } catch (error) {
                console.error(
                    "Error during code resend:",
                    error.response ? error.response.data : error.message
                );
        
                if (error.response && error.response.data && error.response.data.message === "User email is already verified") {
                    setErrorMessage('البريد الإلكتروني قد تم التحقق منه بالفعل.');
                } else {
                    setErrorMessage('حدث خطأ أثناء إعادة إرسال الكود. حاول مرة أخرى.');
                }
            } finally {
                setIsLoading(false);
            }
        };
         
         

  return (
    <div className="activation-page">
    <div className="activation-container">
    <h2 className="text-center mb-4">مرحبا بكم !</h2>
    <h4 className="text-center mb-4">تحقق من بريدك الإلكتروني</h4>
    <form onSubmit={handleActivationpass}>
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
        <p className="cursor:pointer resend-code" role="button" onClick={handleResendCode}>
          إعادة إرسال الكود ؟{" "}
        </p>
      </div>
    </form>
  </div>
  </div>
  )
}

export default ActivePass
