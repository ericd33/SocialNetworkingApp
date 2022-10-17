import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Input,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./CreatePost.css";
import { postPost } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useAuth0} from '@auth0/auth0-react'
export default function CreatePost() {
  const [modal, setModal] = useState(false);
  const User = useSelector(state => state.myUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth0() 
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [formState, setFormState] = useState({
    content: "",
    idUser:"634d5e8886ccf56a0ff71942",
    image:"",
    idComment:""
  });
  
  const handleChange = (e) => {
    setFormState({
      content: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // e.peventDefault();
    dispatch(postPost(formState));
    // navigate("/");
  };

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
          <h2>Create a post</h2>
          <IconButton
            sx={{ width: "35px", height: "35px", top: "20px" }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <TextField
          id="outlined-multiline-static"
          label="¿Que estas pensando?"
          multiline
          rows={4}
          value={formState.content}
          name="content"
          className="textField"
          onChange={handleChange}
        />
        <div align="right">
        <IconButton>
          <Input id='inputImage'type="file" accept="image/*" disableUnderline={true}/>
          <FileUploadIcon/>
        </IconButton>
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container">
      <IconButton
        onClick={() => opencloseModal()}
        id="buttonPost"
        sx={{ bgcolor: yellow[500] }}
      >
        <PostAddOutlinedIcon sx={{ color: grey[800] }} />
      </IconButton>
      <Modal open={modal} onClose={opencloseModal}>
        {body}
      </Modal>
    </div>
  );
}
