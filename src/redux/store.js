import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../CounterSlice"
import userReducer from "./userSlice"
export const store=configureStore({
    reducer:{
        counter:counterReducer,
        users:userReducer
    },
})
