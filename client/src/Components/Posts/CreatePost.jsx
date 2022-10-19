import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Input,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./CreatePost.css";
import { getMyUser, postPost } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function CreatePost() {
  const [modal, setModal] = useState(false);

  let userEmail = JSON.parse(localStorage.getItem('user')).email;

  useEffect(() => {
    dispatch(getMyUser(userEmail));
  }, []);

  const dispatch = useDispatch();
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [formState, setFormState] = useState({
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    const data = {
      ...formState,
      email: userEmail
    };

    dispatch(postPost(localStorage.getItem('token').slice(1,-1), data));

    setModal(!modal);
    window.location.reload()
  };

  const body = (
    <Card
      className="postCreator"
      sx={{
        width: 600,
        borderRadius: "15px",
        bgcolor: 'custom.main',
        fontFamily: "Nunito",
        color: 'primary.light',
      }}
    >
      <CardContent>
        <div className="headerModal">
          <h2>Create a post</h2>
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
            value={formState.content}
            variant="filled"
            name="content"
            className="textField"
            onChange={handleChange}
          />
          <TextField id="filled-basic" 
          label="Image link" variant="filled" 
          value={formState.image}
          name="image"
          className="textField"
          onChange={handleChange}
          />
        </div>

        <div align="right">
          <Button 
          id='Postbutton'
          sx={{mt:3, bgcolor:'secondary.main', fontFamily: "Nunito",
          color:'custom.dark'}} onClick={handleSubmit} variant='contained'>Post</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton
        onClick={() => opencloseModal()}
        id="buttonPost"
        sx={{ bgcolor: 'secondary.main' }}
      >
        <PostAddOutlinedIcon sx={{ color: grey[800] }} />
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
