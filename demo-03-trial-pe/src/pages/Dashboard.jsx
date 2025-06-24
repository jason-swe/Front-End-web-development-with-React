import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router';
function Dashboard() {
  //khai báo biens để lưu thông tin
      const [data, setData] = useState([])
      //gọi API: /GET students
      useEffect(() => {
          const fetchData = async() => {
              //chú ý chỗ axios.get
              try{
                  const response = 
                  await axios.get(import.meta.env.VITE_API_URL)
                  setData(response.data.sort((a, b) => b.id - a.id))
              }catch (error){
                  console.log(error)
              }
              
              
          }
          fetchData()
      }, [])

      const handleDelete =async(id) => {
        try{
          //xóa dữ liệu 
          //endpoint: /delete /id
          //hỏi có muốn xóa không 
           if (window.confirm('Are you sure?')){
           await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`)
          //cập nhật sữ liệu sau khi đã xóa
          //lọc ra danh sách
          setData(data.filter(student => student.id !==id))
          alert('Delete successfully')
           }
        }catch(error) {
          console.log(error)
        }
      }
      const navigate =useNavigate()
  return (
    <>
    <button onClick={() => navigate('/create')} className='btn btn-primary'>Create</button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Class</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((student) => 
        <tr>
          <td>{student.id}</td>
          <td>{student.name}</td>
          <td>{student.class}</td>
          <td><img src={student.image} style={{width:100}}/></td>
          <td><button onClick={()=> navigate(`/Update/${student.id}`)} className='btn btn-primary'>Update</button>
            <button className='btn btn-danger' onClick={() => handleDelete(student.id)} variant='danger'>Delete</button>
          </td>
        </tr>
        )}
        

      </tbody>
    </Table>
    </>
  )
}

export default Dashboard