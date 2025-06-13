import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deCrement, increment, xxx } from "../slice/counterSlice";


export default function MyButton() {
    //sử dụng hook useDispatch từ thư viện react-redux
    const dispatch=useDispatch()
    const handleIncrement=() => {
        //để reducer biết chọn action nào thì chỗ này cần dispatch 1 action
        dispatch(increment())
    }
    const handleDecrement=() => {
        dispatch(deCrement())
    }
    const [amount, setAmount]= useState(5)
    const handleIncrementByAmount =() =>{
        dispatch(xxx(Number(amount)))
    }
  return (
    <>
    <button onClick={handleIncrement}>+</button>
    <button onClick={handleDecrement}>-</button>
    <input value={amount} onChange={e =>setAmount(e.target.value)}></input>
    <button onClick={handleIncrementByAmount}>+</button>
    </>
  )
}