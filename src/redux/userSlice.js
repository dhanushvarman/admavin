import { createSlice } from "@reduxjs/toolkit";

const initialState={
    data:[
   ]
}
export const userSlice=createSlice({
    name:"userData",
    initialState,
    reducers:{
        addUser:(state, action)=>{
            let userId=state.data.length+1
            let newUser={id:userId, ...action.payload}
            state.data.push(newUser)
        },
        deleteUser:(state, action)=>{
            let index=state.data.findIndex((user)=>user.id===action.payload)
            state.data.splice(index, 1)
        },
        updateUser:(state, action)=>{
            let index=state.data.findIndex((user)=>user.id===action.payload.id)
            state.data[index]=action.payload
        },
        getUser:(state)=>{
            state.data=[...state.data]
        }
    }
})

export const {addUser, deleteUser, updateUser, getUser}=userSlice.actions
export default userSlice.reducer