import React, { useState } from 'react';
import axios from 'axios';
import { FaLock, FaMousePointer } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import "./login.css";


const RechangePass = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!password || !passwordConfirm) {
      setErrorMessage('يرجى إدخال كلمة المرور وتأكيدها.');
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMessage('كلمتا المرور غير متطابقتين.');
      return;
    }

    setIsLoading(true);

    try {
    if(Cookies.get("token")){
      
      const response = await axios.put(
        'https://charity-platform-backend.onrender.com/api/auth/reset-password',
        { password, passwordConfirm }
        ,
            { headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get("token")}`,
            }
           }
      );
    }


      if (response.status === 200) {
        setSuccessMessage('تم تغيير كلمة المرور بنجاح.');
      
        navigate('/login'); // Redirect to login page after successful password change
      } else {
        setErrorMessage('حدث خطأ أثناء تغيير كلمة المرور. حاول مرة أخرى.');
      }
    } catch (error) {
      console.error('Error changing password:', error.response ? error.response.data : error.message);
      setErrorMessage('حدث خطأ في عملية تغيير كلمة المرور. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="activation-page">
      <div className="activation-container">
        <h2 className="text-center mb-4">تغيير كلمة المرور</h2>
        <form onSubmit={handleSubmit}>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                placeholder="تأكيد كلمة المرور الجديدة"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-center button-signup">
            <button className="btn btn-primary btn-block mb-2" type="submit" disabled={isLoading}>
              <FaMousePointer className="mr-2 icone" /> تغيير كلمة المرور
            </button>
            {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
            {successMessage && (
              <p style={{ color: 'green' }}>{successMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RechangePass;
