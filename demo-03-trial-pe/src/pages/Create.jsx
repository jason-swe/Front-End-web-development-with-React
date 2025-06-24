import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from 'react-router';
function Create() {
    const navigate =useNavigate()
    //khai báo fomik
    const formik = useFormik({
        initialValues: {
            name: '',
            class: ''
        },
        onSubmit: async(values) => {
            try{
                //post
               await axios.post(import.meta.env.VITE_API_URL, values)
                alert('create successfully')
                navigate('/management')
            }catch (error) {
                console.log(error)
            }
        }
    })
  return (
     <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        name='name'
        value={formik.values.name}
        onChange={formik.handleChange}
        />
        <Form.Text className="text-muted">
         {formik.errors.name}
        </Form.Text>
      </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>class</Form.Label>
        <Form.Control 
        name='class'
        value={formik.values.class}
        onChange={formik.handleChange}
        />
        <Form.Text className="text-muted">
         {formik.errors.class}
        </Form.Text>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Create