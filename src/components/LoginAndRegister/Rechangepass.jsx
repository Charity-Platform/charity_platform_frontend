import React, { useEffect, useState } from 'react'
import { FaLock, FaMousePointer } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';


const Rechangepass = () => {

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the token from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token"); // get the token value
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    useEffect(() => {
      console.log("Token received:", token);
    }, [token]);

    const changepass = async (event) => {
      event.preventDefault();
      setIsLoading(true);

      if (!newPassword || !confirmPassword) {
        setErrorMessage("يرجى إدخال كلمتي المرور.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setErrorMessage("كلمات المرور غير متطابقة.");
        return;
      }

      if (!token) {
        setErrorMessage("رمز التحقق غير موجود في الرابط.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.put(
          "https://charity-platform-backend.onrender.com/api/auth/reset-password",
          {
            password: newPassword,
            passwordConfirm: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        if (response.status === 200) {
          alert("تم تغيير كلمة المرور بنجاح."); // Optional success message
          navigate("/login");
        } else {
          setErrorMessage("لم يتم تغيير كلمة المرور. حاول مرة أخرى.");
        }
      } catch (error) {
        console.error(
          "Error during password change:",
          error.response ? error.response.data : error.message
        );

        // Handle JWT expiration or other issues
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === "jwt expired"
        ) {
          setErrorMessage("رمز التحقق منتهي الصلاحية. يرجى طلب رمز جديد.");
        } else if (
          error.response &&
          error.response.data &&
          error.response.data.message ===
            "You are not logged in. Please log in to access this route"
        ) {
          setErrorMessage("يجب عليك تسجيل الدخول أولاً.");
        } else {
          setErrorMessage(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : "حدث خطأ أثناء تغيير كلمة المرور. حاول مرة أخرى."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="activation-page">
    <div className="update-password-page">
    <div className="update-password-container">
        <h2 className="text-center mb-4">تحديث كلمة المرور</h2>
        <form onSubmit={changepass}>
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
                        placeholder="أدخل كلمة المرور الجديدة"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
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
                        placeholder="تأكيد كلمة المرور"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="text-center button-update">
                <button
                    className="btn btn-primary btn-block mb-2"
                    type="submit"
                    disabled={isLoading}
                >
                    <FaMousePointer className="mr-2 icone" /> تحديث
                </button>
                {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                )}
            </div>
        </form>
    </div>
</div>
</div>
  )
}

export default Rechangepass
