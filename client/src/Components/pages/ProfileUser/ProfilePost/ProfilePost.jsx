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
import CommentsModal from "../../../Posts/Modals/CommentsModal";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { getPostId, putLikes } from "../../../../Redux/actions.js";

const ProfilePost = ({ idPost, userInfoRen }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState({ name: "", avatar: "" });
  const auth = getAuth();
  const token = auth.currentUser.accessToken;
  
	useEffect(()=>{
		dispatch(getPostId(token,idPost))
    setUser({
      name: userInfoRen.name,
      avatar: userInfoRen.image,
    });
	},[dispatch])

  const putLike = () => {
    dispatch(putLikes(idPost, auth.currentUser.email, token));
  };

	const post = useSelector((state)=> state.PostID)
  
  return (
    <div>
      {console.log(post)}
      {/* {console.log(post.content)} */}
    <br />
    <Card
      sx={{
        width: 600,
        bgcolor: 'custom.dark',
        fontFamily: "Nunito",
        borderRadius:3
      }}
    >
      <CardHeader
        sx={{ pt: 0, pb: 0, mt: 2, color:'primary.main'}}
        avatar={
          <Avatar sx={{ bgcolor: yellow[500] }} src={User.avatar}></Avatar>
        }
        title={User.name}
      />
      <CardContent sx={{ pb: 1, color:'primary.main'}}>{post.content}</CardContent>

      {/* {userInfoRen.image ? (
        <CardMedia component="img" alt="image" height="400" image={userInfoRen.image} />
      ) : (
        <div></div>
      )} */}

      <CardActions disableSpacing>
        <IconButton id='buttonsPost' onClick={putLike}>
          <ThumbUpOffAltIcon/>
        </IconButton>
        {/* <p id='textButtons'>{post.likes?.length} likes</p> */}

        {/* ----Dislikes para un FUTURO---- */}

        {/* <IconButton>
                          <ThumbDownOffAltIcon/>
                      </IconButton>
                      <p>6 dislikes</p> */}

                      
        {/* {post.comments.length !== 0 ? (
          <CommentsModal comments={post.comments} />
        ) : (
          <IconButton id='buttonsPost'>
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        )}
        <p id='textButtons'>{post.comments.length} comments</p> */}

        {/* --- Shares para FUTURO --- */}

        {/* <IconButton>
                          <ReplyIcon />
                      </IconButton>
                      <p>3 shares</p> */}
      </CardActions>
    </Card>
  </div>
    // <div>
    //   {console.log(post.content)}
		// 	{post.content} 
		// </div>
  )
}

export default ProfilePost