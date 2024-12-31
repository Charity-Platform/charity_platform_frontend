import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Card, Container, Spinner } from 'react-bootstrap';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for the submit button

  // الحصول على البريد الإلكتروني من الـ state
  const email = location.state?.email || ''; 

  // تحقق من أن البريد الإلكتروني تم تمريره بشكل صحيح
  useEffect(() => {
    console.log('تم استلام البريد الإلكتروني للتحقق:', email);
  }, [email]);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();

    if (!email || !verificationCode) {
      setErrorMessage('البريد الإلكتروني أو رمز التحقق مفقود.');
      return;
    }

    setIsLoading(true); // تشغيل حالة التحميل

    try {
      // تضمين البريد الإلكتروني ورمز التحقق في طلب الـ POST
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_URL}auth/verify-email`,
        {
          email: email,  // تمرير البريد الإلكتروني
          emailVerifyCode: verificationCode  // تمرير رمز التحقق
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('الاستجابة:', response.data);

      setSuccessMessage('تم التحقق من البريد الإلكتروني بنجاح!');
      setErrorMessage('');
      setWelcomeMessage(
        ' مرحباً بك في المنصة! كمدرب، يمكنك الآن إضافة الدورات، الكتب، والاستشارات إلى حسابك. ولكن يرجى الانتظار حتى يتم قبول عضويتك من قبل مسئول المنصة فى وقت لاحق وشكرا لتفهمك '
      );
      
      // تأخير التنقل حتى يتمكن المستخدم من قراءة رسالة النجاح
      setTimeout(() => {
        navigate('/welcomementor'); // تغيير التنقل إلى صفحة "الترحيب"
      }, 4000);

    } catch (error) {
      // طباعة تفاصيل الخطأ في حال حدوثه
      console.error('تفاصيل الخطأ:', error.response?.data || error.message);
      setErrorMessage('فشل التحقق. يرجى التأكد من الرمز.');
      setSuccessMessage('');
    } finally {
      setIsLoading(false); // إيقاف حالة التحميل
    }
  };

  return (
    <Container className="verify-email">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">تحقق من بريدك الإلكتروني</h2>
        <p className="text-center">تم إرسال رمز التحقق إلى بريدك الإلكتروني: {email}</p>
        <Form onSubmit={handleVerifyEmail}>
          <Form.Group controlId="formVerificationCode" className="mb-3">
            <Form.Label>رمز التحقق</Form.Label>
            <Form.Control
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="أدخل رمز التحقق الخاص بك"
              required
            />
          </Form.Group>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}
          {welcomeMessage && <p className="text-info">{welcomeMessage}</p>}

          <Button variant="primary" type="submit" className="w-50" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : ' تحقق من البريد الإلكتروني'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default VerifyEmail;
