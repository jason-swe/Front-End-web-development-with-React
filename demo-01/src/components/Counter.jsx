import React from 'react'
import { useSelector } from 'react-redux'

export default function Counter() {
    //để lấy dc thông tin state lưu trên store 
    //react-redux cung cấp 1 hook làm việc này
    //useSelector()
    //lấy thông tin state count
    const count = useSelector((state) => state.counter.count)
  return (
    <div>Counter: {count}</div>
  )
}