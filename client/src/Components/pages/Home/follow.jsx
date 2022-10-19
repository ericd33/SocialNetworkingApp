import { getAuth } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { follows } from "../../../Redux/actions";

export default function Follow({email}){
    console.log(email)
    const dispatch = useDispatch()
    const userEmail = getAuth().currentUser.email
    let token = getAuth().currentUser.accessToken
    console.log(userEmail)
    const info = {
        emailFollowed:email,
        emailFollow: userEmail
    }
    const handleFollow = (e)=>{
        e.preventDefault()
        dispatch(follows(info,token))
    }
    
    return(
        <button onClick={handleFollow}>follow</button>
    )
}