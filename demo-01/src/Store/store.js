import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "../slice/counterSlice";


// tạo STORE 
const store = configureStore({
    //khai báo REDUCER
    //reducer:???
    //=> cần tạo REDUCER
    // => redux toolkit sử dụng SLICE
    reducer:{
        counter: counterSlice.reducer
    }
})
export default store