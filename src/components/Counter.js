import React from "react";
import { increment, decrement, incrementByAmount } from "../CounterSlice";
import { useSelector, useDispatch } from "react-redux";
const Counter=()=>{
    const count=useSelector((state)=>state.counter.value)
    const dispatch=useDispatch()
    return(
        <>
        <p>counter:{count}</p>
        <button onClick={()=>dispatch(increment())}>increment</button>
        <button onClick={()=>dispatch(decrement())}>decrement</button>
        <button onClick={()=>dispatch(incrementByAmount(50))}>IncrementByAmount</button>
        </>
    )
}
export default Counter