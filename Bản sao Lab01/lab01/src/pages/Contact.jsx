import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form as BForm, Button } from 'react-bootstrap';

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),

  email: Yup.string().email('Invalid email').required('Email is required'),
  
  phone: Yup.string()
    .matches(/^\d+$/, 'Phone must be a number')
    .min(8, 'Phone must be at least 8 digits')
    .required('Phone is required'),
  program: Yup.string().notOneOf([''], 'Please select a program').required('Program is required'), //chọn giá trị khác rỗng
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  agree: Yup.boolean().oneOf([true], 'You must agree to terms'),// đồng ý với điều khoản
});

function Contact({ darkMode }) {
  const [submitted, setSubmitted] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      program: 0,
      message: '',
      agree: false,
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {
      setSubmitted(true);
      resetForm();
    },
  });
  return (
    <div style={{
      minHeight: '80vh',
      background: darkMode ? '#181818' : '#fff',
      color: darkMode ? '#fff' : '#222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 120,
      fontFamily: 'Montserrat, sans-serif',
    }}>
      <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 24 }}>Contact Us</h2>
      <div style={{ fontSize: 18, marginBottom: 32, color: darkMode ? '#ccc' : '#444', maxWidth: 400, textAlign: 'center' }}>
        Feel free to contact us for any questions or feedback!
      </div>
      {submitted ? (
        <div style={{ width: 400, maxWidth: '90%' }}>
          <div className="alert alert-success text-center" style={{ fontSize: 20, fontWeight: 600, marginTop: 32 }}>
            Thank you for contacting us!<br/>We have received your message.
          </div>
        </div>
      ) : (
      <BForm noValidate onSubmit={formik.handleSubmit} style={{ width: 400, maxWidth: '90%' }}>
        <BForm.Group className="mb-3" controlId="contactName">
          <BForm.Label>Name</BForm.Label>
          <BForm.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && !!formik.errors.name}
            style={{ background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#fff' : '#222' }}
          />
          <BForm.Control.Feedback type="invalid">{formik.errors.name}</BForm.Control.Feedback>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="contactEmail">
          <BForm.Label>Email</BForm.Label>
          <BForm.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.email && !!formik.errors.email}
            style={{ background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#fff' : '#222' }}
          />
          <BForm.Control.Feedback type="invalid">{formik.errors.email}</BForm.Control.Feedback>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="contactPhone">
          <BForm.Label>Phone Number</BForm.Label>
          <BForm.Control
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.phone && !!formik.errors.phone}
            style={{ background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#fff' : '#222' }}
          />
          <BForm.Control.Feedback type="invalid">{formik.errors.phone}</BForm.Control.Feedback>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="contactProgram">
          <BForm.Label>Program of Study</BForm.Label>
          <BForm.Select
            name="program"
            value={formik.values.program}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.program && !!formik.errors.program}
            style={{ background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#fff' : '#222' }}
          >
            <option value={0}>Please select</option>
            <option value={1}>Software Engineering</option>
            <option value={2}>Information Systems</option>
            <option value={3}>Information Assurances</option>
            <option value={4}>Internet of Things</option>
            <option value={5}>Artificial Intelligence</option>
            <option value={6}>Digital Art & Design</option>
          </BForm.Select>
          <BForm.Control.Feedback type="invalid">{formik.errors.program}</BForm.Control.Feedback>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="contactMessage">
          <BForm.Label>Message</BForm.Label>
          <BForm.Control
            as="textarea"
            name="message"
            rows={4}
            placeholder="Type your message..."
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.message && !!formik.errors.message}
            style={{ background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#fff' : '#222' }}
          />
          <BForm.Control.Feedback type="invalid">{formik.errors.message}</BForm.Control.Feedback>
        </BForm.Group>
        <BForm.Group className="mb-3" controlId="contactAgree">
          <BForm.Check
            type="checkbox"
            name="agree"
            label="I agree to the terms and conditions"
            checked={formik.values.agree}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.agree && !!formik.errors.agree}
            feedback={formik.errors.agree}
            feedbackType="invalid"
            style={{ color: darkMode ? '#fff' : '#222' }}
          />
        </BForm.Group>
        <Button type="submit" variant="primary" style={{ background: '#F7B6C2', border: 'none', color: '#222', fontWeight: 700, width: '100%' }}>
          Send
        </Button>
      </BForm>
      )}
    </div>
  );
}

export default Contact; 