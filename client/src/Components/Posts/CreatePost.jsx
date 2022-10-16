import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./CreatePost.css";
import { postPost } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [formState, setFormState] = useState({
    content: "",
  });

  const handleChange = (e) => {
    setFormState({
      [e.target.content]: e.target.value,
    });
    console.log(e.target.value);
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
