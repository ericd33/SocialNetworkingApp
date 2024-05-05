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
import { useDispatch, useSelector } from "react-redux";
import { putLikes } from "../../../../Redux/actions.js";

const ProfilePost = ({ post, userInfoRen }) => {
  const dispatch = useDispatch();

  const putLike = () => {
    dispatch(putLikes(post._id, token));
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
            <Avatar sx={{ bgcolor: yellow[500] }} src={userInfoRen.avatar}></Avatar>
          }
          title={userInfoRen.name + 'asdas'}
        />
        <CardContent sx={{ pb: 1, color: 'primary.main' }}>{post.content}</CardContent>


        <CardActions disableSpacing>
          <IconButton id='buttonsPost' onClick={putLike}>
            <ThumbUpOffAltIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default ProfilePost
