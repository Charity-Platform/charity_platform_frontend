import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Contact.css'
import { useState } from 'react';



const ContactForm = () => {

const [loading, setloading] = useState(false);
const [name, setname] = useState("");
const [email, setemail] = useState("");
const [address, setaddress] = useState("");
const [phone, setphone] = useState("");
const [message, setmessage] = useState("");

    
  const handleSubmit =async (e) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !message || !address) {
        alert("من فضلك أدخل المطلوب ف هذا الجزء للمتابعة وشكرا لك");
        return; // Add this line to prevent further execution if any field is missing
    }
    setloading(true); // Set loading to true
    try{

        const response = await axios.post(
            "https://charity-platform-backend.onrender.com/api/contact-us",
        {
            name : name ,
            email : email ,
            address : address ,
            phone : phone ,
            message : message ,

        });
        //console.log(`Response Status: ${response.status}`); // طباعة حالة الرد

        if (response.status === 200 || response.status === 201) {
            alert("تم إرسال رسالتك بنجاح شكرا لك");
            setaddress("");
            setemail("");
            setmessage("");
            setname("");
            setphone("");
            console.log(response.data);

        } else {
            alert("حاول مرة أخرى");
            
        }
        console.log(response.data);
       
    } catch (error) {
        console.error("Error during submission:", error.response ? error.response.data : error.message);
        alert("حدث خطأ أثناء إرسال رسالتك. حاول مرة أخرى.");
        return; // Ensure that the function exits after handling the error
    } finally {
        setloading(false);
    }
};

  return (
    
    <Container className="py-4 form-page">
            <Row>
                <Col className='form-contact'>
                    <Form onSubmit={handleSubmit} dir='rtl'>                      
                        <Form.Group controlId="formName">
                            <Form.Label>الاسم </Form.Label>
                            <Form.Control
                             type="text" 
                             placeholder="ادخل اسمك " 
                             value={name}
                             onChange={(e)=>setname(e.target.value)}
                             />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>رقم الهاتف  </Form.Label>
                            <Form.Control
                             type="text"
                              placeholder="ادخل رقم هاتفك " 
                              value={phone}
                              onChange={(e)=>setphone(e.target.value)}
                              />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>عنوانك الشخصى  </Form.Label>
                            <Form.Control
                             type="text"
                              placeholder="ادخل عنوانك الشخصى " 
                              value={address}
                              onChange={(e)=>setaddress(e.target.value)}
                              />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>عنوان البريد الإلكترونى</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="ادخل عنوان بريدك الالكترونى"
                             required 
                             value={email}
                             onChange={(e)=>setemail(e.target.value)}
                             />
                        </Form.Group>

                        <Form.Group controlId="formMessage">
                            <Form.Label>رسالتك </Form.Label>
                            <Form.Control
                             as="textarea" 
                             rows={5}
                              placeholder="ادخل رسالتك " 
                              value={message}
                              onChange={(e)=>setmessage(e.target.value)}
                              />
                        </Form.Group>

                        <Button type="submit" className='btn-contact' disabled={loading}>
                          {loading ? "جارٍ الإرسال..." : "إرسال"} 
                       </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    
  );
}

export default ContactForm
