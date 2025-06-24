import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate, useParams } from 'react-router';
function Update() {
    //lấy thông tin item muốn update
    const {id} = useParams()
    const [item, setItem] = useState({}) //nếu để (null) thì thêm code bên dưới 
    useEffect(() => {
        const fetchData = async() => {
            //chú ý chỗ axios.get
            try{
                const response = 
                await axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
                //setItem(response.data) //không dùng nữa
                formik.setValues(response.data)
            }catch (error){
                console.log(error)
            }
            
            
        }
        fetchData()
    }, [id])
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
                //chỗ sửa 2: thay post  put
                //thay endpoint + id
               await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, values)
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

export default Update