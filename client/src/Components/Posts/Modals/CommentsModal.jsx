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
      className="postCreator"
      sx={{
        width: 600,
        borderRadius: "15px",
        bgcolor: grey[300],
        fontFamily: "Nunito",
        color: grey[900],
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Comments</h2>
          <IconButton
            sx={{ width: "35px", height: "35px", top: "20px" }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {comments?.map((c) => (
            <Card
              sx={{
                width: 500,
                bgcolor: grey[300],
                fontFamily: "Nunito",
                color: grey[900],
                
              }}
            >
              <CardHeader
                sx={{ pt: 0, pb: 0, mt: 2 }}
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
