import { getAuth } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { follows } from "../../../Redux/actions";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { IconButton } from "@mui/material";

export default function Follow({email}){
    const dispatch = useDispatch()
    const userEmail = getAuth().currentUser.email
    let token = getAuth().currentUser.accessToken
    const info = {
        emailFollowed:email,
        emailFollow: userEmail
    }
    const handleFollow = (e)=>{
        e.preventDefault()
        dispatch(follows(info,token))
    }
    
    return(
        <IconButton id='buttonsPost' onClick={handleFollow}>
            <PersonAddAlt1OutlinedIcon/>
        </IconButton>
    )
}