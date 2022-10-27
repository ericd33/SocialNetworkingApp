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
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

import "../CreatePost.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsPost } from "../../../Redux/actions";
import { useUserAuth } from "../../../context/UserAuthContext";

import "./CommentsModal.css";
import { Comments } from "./comments";

export default function CommentsModal({idPost}) {
  const [modal, setModal] = useState(false);
  const userE = JSON.parse(localStorage.getItem('user'));

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };
  useEffect(()=>{
    if(modal)
    dispatch(getCommentsPost(token,idPost))
    // console.log(token,idPost)
  },[getCommentsPost,modal])
  const comments = useSelector(e=>e.comments)
  
  console.log(comments);

  const body = (
    <Card
      className="commentsList"
      sx={{
        width: 500,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
        maxHeight: 400
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
        <div className='boxComments'>
        {comments?.map((c) => {
          switch(userE.role){
            case "admin":
              return(<Comments enabled={c.enabled} avatar={c.avatar} name={c.name} text={c.text} id={c.id} />)
            case 'user':
            if(c.enabled){
              return(<Comments enabled={c.enabled} avatar={c.avatar} name={c.name} text={c.text} id={c.id} />)
            }
            default : return <></>
            }
        }
      )}
      </div>
    </CardContent>
  </Card>
  );

  return (
    <div className="container">
      <IconButton onClick={() => opencloseModal()}>
        <ChatBubbleOutlineRoundedIcon id='ButtonActionPost' sx={{color:'primary.dark'}}/>
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
