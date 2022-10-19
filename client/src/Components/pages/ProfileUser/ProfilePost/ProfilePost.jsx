import React from 'react'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { yellow, grey } from "@mui/material/colors";
import ReplyIcon from "@mui/icons-material/Reply";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { useEffect, useState } from "react";
import axios from "axios";
// import CommentsModal from "./Modals/CommentsModal";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getPostsByName } from "../../../../Redux/actions.js";

const ProfilePost = ({ idPost }) => {

	const dispatch = useDispatch();
	const token = getAuth().currentUser.accessToken
	// useEffect(()=>{
	// 	dispatch(getPostsByName(token,idPost))
	// },[])
	const postsPro = useSelector((state)=> state.postsUser)
  return (
    <div>
			ProfilePost {idPost} 
			{console.log(postsPro)}
		</div>
  )
}

export default ProfilePost