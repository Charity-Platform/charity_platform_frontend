import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';

const SignupInstructor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    image: '',
    links: '',
    description: '',
    field: '', // selected field
    hourePrice: '',
    password: '' 
  });

  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]); // To store available fields from API

  // Fetch fields from API on component mount
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("all field request",response.data.document)
        setFields(response.data.document); // Set the fields received from the API
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };
    
    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required';
    if (!formData.field) newErrors.field = 'Field is required';
    if (!formData.password) newErrors.password = 'Password is required';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const linksArray = formData.links.split(',').map(link => link.trim()).filter(link => link);
  
      await axios.post(`${import.meta.env.VITE_MAIN_URL}auth/signup-mentor`, {
        ...formData,
        links: linksArray, // Send links as an array
        active: true,
        accepted: true,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  
      navigate('/verifyemail', {
        state: {
          email: formData.email,
          message: "مرحباً بك في الموقع! يمكنك الآن إضافة دورات وكتب واستشارات بعد تأكيد البريد الإلكتروني الخاص بك."
        }
      });
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      setErrors({ submit: 'Signup failed. Please try again.' });
    }
  };

  return (
    <Container className="signup-instructor">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">تسجيل كمستشار</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>الاسم </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  placeholder="أدخل اسمك هنا "
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>البريد الالكترونى </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  placeholder="ادخل البريد الالكترونى "
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>الجوال </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  placeholder="ادخل رقم جوالك "
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formBirthdate" className="mb-3">
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  isInvalid={!!errors.birthdate}
                />
                <Form.Control.Feedback type="invalid">{errors.birthdate}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formAddress" className="mb-3">
            <Form.Label>دولة الاقامة  </Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="ادخل اسم الدولة التى تعيش فيها "
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>ادخل لينك الصورة الخاصة </Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="لينك الصورة "
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formField" className="mb-3">
                <Form.Label>ادخل مجالك  </Form.Label>
                <Form.Control
                  as="select"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  isInvalid={!!errors.field}
                >
                  <option value="">اختر المجال</option>
                  {fields.map((field) => (
                    <option key={field.id} value={field.name}>
                      {field.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.field}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>تفاصيل عن خبراتك فى المجال  </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="اخبرنا عن خبراتك فى المجال المتخصص فيه "
            />
          </Form.Group>

          <Form.Group controlId="formHourePrice" className="mb-3">
            <Form.Label> تكلفة الاستشارة </Form.Label>
            <Form.Control
              type="number"
              name="hourePrice"
              value={formData.hourePrice}
              onChange={handleChange}
              placeholder="ادخل تكلفة للاستشارة "
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>الرقم السرى الخاص بك </Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="ادخل الرقم السرى الخاص بك "
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {errors.submit && <p className="text-danger">{errors.submit}</p>}

          <Button variant="primary" type="submit" className="w-50">
            تسجيل
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignupInstructor;
