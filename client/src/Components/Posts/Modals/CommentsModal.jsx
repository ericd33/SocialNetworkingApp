import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import "../CreatePost.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsPost } from "../../../Redux/actions";
import { useUserAuth } from "../../../context/UserAuthContext";


import "./CommentsModal.css";


export default function CommentsModal({idPost}) {
  const [modal, setModal] = useState(false);

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };
  useEffect(()=>{
    if(modal)
    dispatch(getCommentsPost(token,idPost))
    console.log(token,idPost)
  },[getCommentsPost,modal])
  const comments = useSelector(e=>e.comments)
  
  console.log(comments)

  const body = (
    <Card
      className="commentsList"
      sx={{
        width: 500,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Comments</h2>
          <IconButton
            id='closeIcon'
            sx={{ width: "35px", height: "35px", top: "20px",
            bgcolor:'custom.light' }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{pr:'1px'}}/>
          </IconButton>
        </div>
        {comments?.map((c) => (
            <Card
              sx={{
                width: 462,
                bgcolor: 'custom.light',
                fontFamily: "Nunito",
                color: grey[900],
                borderRadius:'15px',
                height:'55px',
                mb:'10px'
              }}
            >
              <CardHeader
                sx={{ pt: '8px' }}
                avatar={
                  <Avatar
              imgProps={{ referrerPolicy: "no-referrer" }}
              sx={{ bgcolor: "primary.light" }}
              src={c.avatar}
            ></Avatar>
                }
                title={c.name}
              />
              <CardContent sx={{ pb: 1 }}>{c.text}</CardContent>
            </Card>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton onClick={() => opencloseModal()}>
        <ChatBubbleOutlineRoundedIcon sx={{color:'primary.dark'}}/>
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
