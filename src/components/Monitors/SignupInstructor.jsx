import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Card, Container,Spinner} from 'react-bootstrap';

const SignupInstructor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    address: '',
    image: null, // Updated to null for file upload
    links: '',
    description: '',
    field: '', // selected field
    hourePrice: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]); // To store available fields from API
  const [isLoading, setIsLoading] = useState(false); // Loading state for the submit button

  // Fetch fields from API on component mount
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}fields`, {
          headers: { 'Content-Type': 'application/json' }
        });
        console.log("all field request", response.data.document);
        setFields(response.data.document); // Set the fields received from the API
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] })); // Save uploaded file
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = ' من فضلك ادخل اسمك الكامل';
    if (!formData.email) newErrors.email = ' من فضلك ادخل البريد الالكترونى الخاص بك';
    if (!formData.phone) newErrors.phone = ' من فضلك ادخل رقم الجوال الخاص بك';
    if (!formData.birthdate) newErrors.birthdate = ' من فضلك ادخل تاريخ الميلاد الخاص بك';
    if (!formData.field) newErrors.field = ' من فضلك اختر المجال الذى ترغب فى التسجيل به';
    if (!formData.password) newErrors.password = ' من فضلك ادخل الرقم السرى الخاص بك';
    if (!formData.image) newErrors.image = 'من فضلك ارفع صورة شخصية';
    if (!formData.description) newErrors.description = ' من فضلك ادخل تفاصيل عن خبراتك فى المجال';
    if (!formData.address) newErrors.address = 'من فضلك ادخل الدولة التى تعيش فيها';
    if (!formData.hourePrice) newErrors.hourePrice = 'من فضك ادخل تكلفة الاستشارة';





    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const linksArray = formData.links.split(',').map(link => link.trim()).filter(link => link);
      const formDataObj = new FormData(); // Use FormData for file uploads

      // Append form data to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "links") {
          formDataObj.append(key, JSON.stringify(linksArray)); // Convert links to string
        } else {
          formDataObj.append(key, value);
        }
      });

      await axios.post(`${import.meta.env.VITE_MAIN_URL}auth/signup-mentor`, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Set appropriate headers
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
              isInvalid={!!errors.address}
              placeholder="ادخل اسم الدولة التى تعيش فيها "
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>رفع الصورة الخاصة </Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                  isInvalid={!!errors.image}
                  accept="image/*"
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
              isInvalid={!!errors.description}
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
              isInvalid={!!errors.hourePrice}
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

          <Button variant="primary" type="submit" className="w-50" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'تسجيل'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default SignupInstructor;
