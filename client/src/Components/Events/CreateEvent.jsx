import { useState, useEffect } from "react";
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
import {DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./CreateEvent.css";
import { postEvent } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getMyUser } from "../../Redux/actions";

// import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function CreateEvent() {
  const [modal, setModal] = useState(false);
  let email = getAuth().currentUser.email
  console.log(email)

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getMyUser(email))
  },[])
  const opencloseModal = () => {
    setModal(!modal);
  };
  email = getAuth().currentUser.email
  let token = getAuth().currentUser.accessToken

  const [formState, setFormState] = useState({
    name:"",
    content: "",
    idUser:'',
    email:email,
    date: "",
    location: "",
    image:''
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      idUser:'',
      email:email,
      image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    dispatch(postEvent(formState,token));
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
        <DateTimePicker 
        onChange={handleChange} 
        name='date' 
        />

        <InputLabel htmlFor='location'>Location</InputLabel>
        <Input
        type='text'
        onChange={handleChange} 
        name='location' 
        value={formState.location}/>
        
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
