import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import MyCard from '../components/MyCard'

function Detail() {
    //lấy id từ url
    const {id} = useParams()
    const [item, setItem] = useState({}) //nếu để (null) thì thêm code bên dưới 
    useEffect(() => {
        const fetchData = async() => {
            //chú ý chỗ axios.get
            try{
                const response = 
                await axios.get(`${import.meta.env.VITE_API_URL}/${id}`)
                setItem(response.data)
            }catch (error){
                console.log(error)
            }
            
            
        }
        fetchData()
    }, [])
    //if (!item) {return <h1>Loding...</h1>}
  return (
    <MyCard item={item}/>
  )
}

export default Detail