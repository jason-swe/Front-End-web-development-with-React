import React from 'react'
import MyButton from './Components/MyButton'
import Counter from './Components/Counter'
import { Provider } from 'react-redux'
import store from './store/store'

export default function App() {
  return (
    <>
    <Provider store={store}>
    <Counter></Counter>
    <MyButton></MyButton>
    </Provider>

    
    </>
  )
}