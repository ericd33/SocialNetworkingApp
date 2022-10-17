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
import "./CreateEvent.css";
import { postEvent } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function CreateEvent() {
  const [modal, setModal] = useState(false);
  const User = useSelector(state => state.myUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opencloseModal = () => {
    setModal(!modal);
  };
  const [formState, setFormState] = useState({
    name:"",
    content: "",
    idUser:'634d8a272b4dde3aced10ad5',
    date: "",
    hour: 0,
    location: "",
    image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg'
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      idUser:'634d8a272b4dde3aced10ad5',
      image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    dispatch(postEvent(formState));
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
        <InputLabel htmlFor='name'>Name</InputLabel>
        <Input
        type='text'
        onChange={handleChange} 
        name='name' 
        value={formState.name}/>
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
        <InputLabel htmlFor='date'>Date</InputLabel>
        <Input 
        type='text' 
        onChange={handleChange} 
        name='date' 
        value={formState.date}/>

        <InputLabel htmlFor='location'>Location</InputLabel>
        <Input
        type='text'
        onChange={handleChange} 
        name='location' 
        value={formState.location}/>

        <InputLabel htmlFor='hour'>Hour</InputLabel>
        <Input
        type='number'
        onChange={handleChange} 
        name='hour' 
        value={formState.hour}/>
        
        
        <div align="right">

        {/* <IconButton>
          <Input id='inputImage'type="file" accept="image/*" disableUnderline={true}/>
          <FileUploadIcon/>
        </IconButton> */}
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
