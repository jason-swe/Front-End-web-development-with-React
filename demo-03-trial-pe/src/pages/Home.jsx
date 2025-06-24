import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MyCard from '../components/MyCard'

function Home() {
    //khai báo biens để lưu thông tin
    const [data, setData] = useState([])
    //gọi API: /GET students
    useEffect(() => {
        const fetchData = async() => {
            //chú ý chỗ axios.get
            try{
                const response = 
                await axios.get(import.meta.env.VITE_API_URL)
                setData(response.data)
            }catch (error){
                console.log(error)
            }
            
            
        }
        fetchData()
    }, [])
  return (
    <div className='row'>
        {data.map((item) => 
        <MyCard item={item} key={item.id}/>)}
    </div>
  )
}

export default Home