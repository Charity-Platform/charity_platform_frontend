import axios from 'axios';
import React, { useState } from 'react';
import { FaLock, FaMousePointer } from 'react-icons/fa';
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';

const ActivePass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [activationCode, setActivationCode] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                `${import.meta.env.VITE_MAIN_URL}auth/verify-reset-code`,
                { resetCode: activationCode },
                {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                
                }
            );

            if (response.status === 200) {
               
                setIsVerified(true);
                setErrorMessage("");
            } else {
                setErrorMessage("الرمز غير صحيح. حاول مرة أخرى.");
            }
        } catch (error) {
            console.error(
                "Error during activation:",
                error.response ? error.response.data : error.message
            );
            setErrorMessage("حدث خطأ في عملية التحقق. حاول مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleResendCode = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
          
            const response = await axios.post(
                `${import.meta.env.VITE_MAIN_URL}auth/resend-code`,
                { email: "user@example.com" } ,
                { headers: { 'Content-Type': 'application/json' } }// Use actual email logic
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
        
            if (error.response && error.response.data.message === "User email is already verified") {
                setErrorMessage('البريد الإلكتروني قد تم التحقق منه بالفعل.');
            } else {
                setErrorMessage('حدث خطأ أثناء إعادة إرسال الكود. حاول مرة أخرى.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = async (event) => {
      event.preventDefault();
      if (newPassword !== confirmPassword) {
          setErrorMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقين.");
          return;
      }

      try {
         

        await axios
        .put(
          `${import.meta.env.VITE_MAIN_URL}auth/reset-password`,
          {
            password: newPassword,
            passwordConfirm: confirmPassword,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true 
          }
        )
        .then((response) => {
            console.log("done change password");
          alert('تم تغيير كلمة المرور بنجاح');
          navigate('/');
        });
    } catch (err) {
      console.log(err);
      alert('تأكد من مطابقة الرقم السرى');
    }
  };


    return (
        <div className="activation-page">
            <div className="activation-container">
                {!isVerified ? (
                    <>
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
                                <button className="btn btn-primary btn-block mb-2" type="submit">
                                    <FaMousePointer className="mr-2 icone" /> تأكيد
                                </button>
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                                <p className="cursor:pointer resend-code" role="button" onClick={handleResendCode}>
                                    إعادة إرسال الكود ؟{" "}
                                </p>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <h2 className="text-center mb-4">تغيير كلمة المرور</h2>
                        <form onSubmit={handlePasswordChange}>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="أدخل كلمة المرور الجديدة"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="تأكيد كلمة المرور الجديدة"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-center button-signup">
                                <button className="btn btn-primary btn-block mb-2" type="submit">
                                    <FaMousePointer className="mr-2 icone" /> تغيير كلمة المرور
                                </button>
                                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default ActivePass;
