import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser , deleteUser, updateUser, getUser} from "../redux/userSlice";
const User=()=>{
    const [name, setName]=useState('')
    const [userId, setUserId]=useState('')
    const {data}=useSelector((state)=>state.users)
    const dispatch=useDispatch()
return(
    <>
    <h1>user Data</h1>
{data.length>0 && data.map((user, index)=>(
        <p key={index}>{user.name} <button onClick={()=>{setUserId(user.id)
            setName(user.name)
        }}>edit</button>       <button onClick={()=>dispatch(deleteUser(user.id))}>delete</button>
</p>

    
))}
<input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
<button onClick={()=>{
    if(userId){
        dispatch(updateUser({id:userId, name}))
        setName("")

    }else{
        dispatch(addUser({name}))
        setName("")
    }
   
}}>{userId?"update":"save"}</button>
{/* sending payload */}
<button onClick={()=>dispatch(getUser())}>get users</button>
    </>
)
}
export default User