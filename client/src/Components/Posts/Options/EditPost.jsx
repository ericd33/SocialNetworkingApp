import { useState } from "react";
import {
  Modal,
  IconButton,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { editPost, getPostId, reportPost } from "../../../Redux/actions";


export default function EditPost({payload}) {
  const [modal, setModal] = useState(false);
  const [newContent, setNewContent] = useState(''); 

  const sessionUser = useUserAuth();
  let token = sessionUser.user.accessToken;
  const dispatch = useDispatch()

  const opencloseModal = () => {
    setModal(!modal);
  };

    useEffect(() => {
        dispatch(getPostId(token,payload.id))
    },[dispatch])

    const Post = useSelector((state) => state.PostID); 

    const handleChange = (e) => {
        // console.log(e.target.value);
        setNewContent(e.target.value);
    }

    const handleSubmit = () => {
      let data = {
          id: payload.id,
          content: newContent,
          email: sessionUser.user.email
      }
      console.log(data);
      dispatch(editPost(data,token))
      setModal(false);
    }

    const body = (
        <Card
          className="postCreator"
          sx={{
            width: 600,
            borderRadius: "15px",
            bgcolor: 'custom.main',
            fontFamily: "Nunito",
            color: 'primary.light',
            height:'320px'
          }}
        >
          <CardContent>
            <div className="headerModal">
              <h2>Edit post</h2>
              <IconButton
                id='closeIcon'
                sx={{ width: "35px", height: "35px", top: "20px",
                bgcolor:'custom.light' }}
                onClick={() => opencloseModal()}
              >
                <CloseIcon sx={{pr:'1px'}}/>
              </IconButton>
            </div>
            <div className="inputsdePost">
              <TextField
                id="filled-multiline-static"
                label="What do you want to share?"
                multiline
                rows={4}
                defaultValue={Post.content}
                variant="filled"
                name="content"
                className="textField"
                onChange={handleChange}
              />
            </div>
            <div align="right">
                <Button 
                id='Postbutton'
                sx={{bgcolor:'secondary.main', fontFamily: "Nunito",
                color:'custom.dark'}} onClick={handleSubmit} variant='contained'>Post</Button>
            </div>
          </CardContent>
        </Card>
      );

  return (
    <div className="container">
      <Button sx={{color:'custom.dark'}} onClick={() => opencloseModal()}>
        Edit
      </Button>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}