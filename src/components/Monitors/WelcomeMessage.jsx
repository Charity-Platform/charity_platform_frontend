import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Mentor.css';

const WelcomeMessage = () => {
  const navigate = useNavigate();

  return (
    <Container className="welcome-message mt-5">
      <Card className="p-4 shadow-lg text-center">
        <h2 className="mb-4">مرحباً بك في منصة استشارة!</h2>
        <p className="mb-4">
          <strong>نشكرك على انضمامك إلى شبكتنا المتخصصة،</strong><br />
          حيث نوفر لك البيئة المثالية لإبراز خبراتك وتقديم استشاراتك للمؤسسات الخيرية والإنسانية.
        </p>

        <div className="my-4">
          <h5>ماذا يمكنك أن تستفيد؟</h5>
          <ul className="list-unstyled text-center mt-3" dir='rtl'>
            <li>• الوصول إلى مجموعة واسعة من المؤسسات الباحثة عن خبراتك.</li>
            <li>• فرص تقديم استشارات متميزة في مجالات العمل الخيري والإنساني.</li>
            <li>• دعم متواصل لتوسيع نطاق عملك وتعزيز مكانتك المهنية.</li>
          </ul>
        </div>

        <p className="mt-4">
          <strong>نحن هنا لنساعدك على النجاح والإسهام في تطوير العمل الخيري.</strong>
        </p>

        <p className="mt-3">
          لأي استفسار، لا تتردد في <a  href="https://wa.me/96565012126"
                    target="_blank">التواصل معنا</a>.
        </p>

        <p className="mt-4">شكرًا لاختيارك منصة استشارة! وسوف يتم قبول طلب انضمامكم للمنصة فى اسرع وقت من قبل مسئول المنصة</p>

        <Button variant="primary" onClick={() => navigate("/")} className="mt-4">
          الانتقال الى الصفحة الرئيسية
        </Button>
      </Card>
    </Container>
  );
};

export default WelcomeMessage;
