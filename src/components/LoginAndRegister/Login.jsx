import React, { useState } from 'react';
import { FaGoogle, FaEnvelope, FaFacebook,FaPhone, FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [activeTab, setActiveTab] = useState('signin');


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4">مرحبا بكم !</h2>
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => setActiveTab('signin')}
          >
            دخول
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            حساب جديد
          </button>
        </li>
      </ul>
      <div className="tab-content mt-4">
        {activeTab === 'signin' && (
          <div className="tab-pane fade show active">
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaEnvelope /></span>
                </div>
                <input type="email" className="form-control" placeholder="البريد الإلكترونى " />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaLock /></span>
                </div>
                <input type="password" className="form-control" placeholder="الرقم السرى الخاص بك " />
              </div>
            </div>
            <div className="text-center button-signup">
              <button className="btn btn-primary btn-block mb-2">
                <FaGoogle className="mr-2 icone" /> دخول بواسطة جوجل
              </button>
              <button className="btn btn-outline-primary btn-block mb-2">
                دخول بواسطة الجيميل
              </button>
              <button className="btn btn-primary btn-block mb-2">
                <FaFacebook className="mr-2 icone" />دخول بواسطة فيسبوك
              </button>
            </div>
            <p className="text-center mt-3">
              إذا لم يكن لديك حساب  <a href="#register" className='hashtag' onClick={() => setActiveTab('register')}>عمل حساب جديد</a>
            </p>
          </div>
        )}
        {activeTab === 'register' && (
          <div className="tab-pane fade show active">
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaUser /></span>
                </div>
                <input type="text" className="form-control" placeholder="الاسم " />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaEnvelope /></span>
                </div>
                <input type="email" className="form-control" placeholder="البريد الإلكترونى " />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaPhone/></span>
                </div>
                <input type="phone" className="form-control" placeholder="رقم التليفون " />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><FaLock /></span>
                </div>
                <input type="password" className="form-control" placeholder="الرقم السرى الخاص بك" />
              </div>
            </div>
            <div className="text-center button-signup">
              <button className="btn btn-primary btn-block mb-2">
                <FaGoogle className="mr-2 icone" /> دخول بواسطة جوجل
              </button>
              <button className="btn btn-outline-primary btn-block mb-2">
              دخول بواسطة الجيميل
              </button>
              <button className="btn btn-primary btn-block mb-2">
                <FaFacebook className="mr-2 icone" /> دخول بواسطة فيسبوك
              </button>
            </div>
            <p className="text-center mt-3">
             أنا بالفعل لديا حساب  <a href="#signin" className='hashtag' onClick={() => setActiveTab('signin')}>تسجيل الدخول</a>
            </p>
          </div>
        )}
      </div>
      <div className="text-center mt-3">
        <Link to="/contact" className='hashtag'>
        <p  >تواصل معنا / للدعم الفنى </p>
        </Link>
      </div>
    </div>
  </div>

  )
}

export default Login
