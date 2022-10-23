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
import "./CommentsModal.css";

export default function CommentsModal(comments) {
  const [modal, setModal] = useState(false);
  const opencloseModal = () => {
    setModal(!modal);
  };

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
        {comments.comments.map((c, index) => (
          <div key={`${index}`}>
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
                  <Avatar sx={{ bgcolor: yellow[500] }} >R</Avatar>
                }
                title={c}
              />
              <CardContent sx={{ pb: 1 }}>{c && c.text}</CardContent>
            </Card>
          </div>
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
