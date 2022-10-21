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
  Icon,
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
import { useUserAuth } from "../../context/UserAuthContext";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

// import FileUploadIcon from '@mui/icons-material/FileUpload';

export default function CreateEvent() {
  const [modal, setModal] = useState(false);
  const {user} = useUserAuth();
  const token = user.accessToken;
  let userEmail = user.email
  let userName = user.displayName
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  useEffect(()=>{
    dispatch(getMyUser(userEmail))
  },[])
  const opencloseModal = () => {
    setModal(!modal);
  };

  const [formState, setFormState] = useState({
    name:"",
    content: "",
    username: userName,
    email:userEmail,
    date : Date.now(),
    location: "",
    image:''
  });

  function handleDateChange(e) {
    console.log(e._d)
    setFormState({
      ...formState,
      date: e._d
    })
  }

  const handleChange = (e) => {
    console.log(e)
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      email:userEmail,
      image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(!modal)
    dispatch(postEvent(formState,token));
    window.location.reload()
    // navigate("/");
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
        padding:5,
        pt:1
      }}
    >
      <CardContent sx={{padding:0}}>
        <div className="headerModal">
          <div className='TitleCreatePost'>
            <h2>Create a event</h2>
            <Icon><DriveFileRenameOutlineIcon/></Icon>
          </div>
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

          <TextField id="filled-basic" 
            label="Title" variant="filled" 
            value={formState.name}
            name="name"
            type='text'
            className="textField"
            onChange={handleChange}
          />
          <TextField
            id="filled-multiline-static"
            label="Event's description"
            multiline
            rows={4}
            value={formState.content}
            variant="filled"
            name="content"
            className="textField"
            onChange={handleChange}
          />
          <InputLabel htmlFor='date'>Date</InputLabel>
          <DateTimePicker
          minDate={Date.now()}
          onChange={handleDateChange} 
          name='date'
          value={formState.date}
          renderInput={(params) => <TextField {...params} />}
          />
          <TextField id="filled-basic"
            sx={{width:'260px'}}
            label="Location" variant="filled" 
            value={formState.location}
            name="location"
            type='text'
            className="textField"
            onChange={handleChange}
          />
        </div>
        
        <div align="right">

        {/* <IconButton>
          <Input id='inputImage'type="file" accept="image/*" disableUnderline={true}/>
          <FileUploadIcon/>
        </IconButton> */}
          <Button id='Postbutton'
          sx={{mt:5, bgcolor:'secondary.main', fontFamily: "Nunito",
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
