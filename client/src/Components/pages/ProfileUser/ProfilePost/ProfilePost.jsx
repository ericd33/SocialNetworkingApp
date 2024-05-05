import React from 'react'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostId, putLikes } from "../../../../Redux/actions.js";

const ProfilePost = ({ idPost, userInfoRen }) => {
  const dispatch = useDispatch();
  const [User, setUser] = useState({ name: "", avatar: "" });
  let token = window.localStorage.getItem('token')
  token = token.slice(1, -1)
  let user = window.localStorage.getItem('user')
  user = JSON.parse(user)
  useEffect(() => {
    dispatch(getPostId(token, idPost))
    setUser({
      name: userInfoRen.name,
      avatar: userInfoRen.image,
    });
  }, [dispatch])

  const putLike = () => {
    dispatch(putLikes(idPost, user.email, token));
  };

  const post = useSelector((state) => state.PostID)

  return (
    <div>
      <br />
      <Card
        sx={{
          width: 600,
          bgcolor: 'custom.dark',
          fontFamily: "Nunito",
          borderRadius: 3,
          mb: 2
        }}
      >
        <CardHeader
          sx={{ pt: 0, pb: 0, mt: 2, color: 'primary.main' }}
          avatar={
            <Avatar sx={{ bgcolor: yellow[500] }} src={User.avatar}></Avatar>
          }
          title={User.name}
        />
        <CardContent sx={{ pb: 1, color: 'primary.main' }}>{post.content}</CardContent>

        {/* {userInfoRen.image ? (
        <CardMedia component="img" alt="image" height="400" image={userInfoRen.image} />
      ) : (
        <div></div>
      )} */}

        <CardActions disableSpacing>
          <IconButton id='buttonsPost' onClick={putLike}>
            <ThumbUpOffAltIcon />
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
    // 	{post.content} 
    // </div>
  )
}

export default ProfilePost
