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
import { Search } from "./map/search";
import React, { useContext, useRef } from "react"
import { MapaContext } from './map/contex/MapaContext'; 
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import { searchPlaces } from './map/axios/searchPlaces';
import { Navigate, useNavigate } from "react-router-dom";
// import e from "express";

export default function CreateEvent() {
  const [modal, setModal] = useState(false);
  const {user} = useUserAuth();
  const token = user.accessToken;
  let userEmail = user.email
  let userName = user.displayName
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {eventoLocation,setResults,location,setLocation,results} = useContext(MapaContext)
  const userImage = JSON.parse(localStorage.getItem('user'));
  // console.log(location)
  useEffect(()=>{
    dispatch(getMyUser(userEmail))
  },[])
  const opencloseModal = () => {
    setModal(!modal);
  };
// console.log(eventoLocation)
const timeOutRef=useRef()
const [locations,setLocations] = useState([{
    center:"",
    place_name:"",
    text:""
}])
async function search() {
  if(timeOutRef.current){
      clearInterval(timeOutRef.current)
  }
  if(!location) return
  timeOutRef.current = setTimeout(async ()=>{
      const {data} = await searchPlaces.get(`${location}.json`)
      setLocations(data.features)
      setResults(data.features.length>0)
  },500)
}

  const [formState, setFormState] = useState({
    name:"",
    content: "",
    username: userName,
    email:userEmail,
    date : Date.now(),
    avatar: "",
    location: location,
    image:'',
    lat_log: eventoLocation
  });
useEffect(()=>{
  setFormState({
    ...formState,
    location:location,
    lat_log: eventoLocation
  })
},[location])
  function handleDateChange(e) {
    console.log(e._d)
    setFormState({
      ...formState,
      date: e._d
    })
  }

  const handleChange = (e) => {
    e.preventDefault();

    console.log(e)
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      email:userEmail,
      location:location,
      lat_log: eventoLocation,
      avatar: userImage.image,
      image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg',
    });
  };

  const handleSetLocation = (e)=>{
    e.preventDefault();

    setLocation(e.target.innerHTML||e.target.value)
    setFormState({
      ...formState,
      location: e.target.value ||e.target.innerHTML ,
      lat_log: eventoLocation,
      email:userEmail,
      image:'https://www.upcnsfe.com.ar/wp-content/uploads/2022/10/fiesta-1.jpg',
    });
  }
  const handleSubmit = (e) => {
    // e.preventDefault();
    setModal(!modal)
    dispatch(postEvent(formState,token));
    // navigate("/events")
  };

  // console.log(eventoLocation)
    
    // console.log(formState)
  const body = (
    <Card
      className="postCreator"
      sx={{
        width: 600,
        height:550,
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
            label="Location" variant="filled" 
            value={location}
            name="location"
            type='search'
            onKeyUp={search}
            className="location"
            onChange={handleSetLocation}
          />
            <div>
                {
                    locations.length && results
                    ? locations.map(({place_name,text, center},i)=><Search place_name={place_name} text={text} center={center} i={i}/>)
                    : location && results &&(
                        <div>
                            <p className='parrafo'>No encontrado</p>
                            <p className='parrafo'>{location}</p>
                        </div>
                    )
                }
            </div>
        </div>
        
        <div align="right">

        {/* <IconButton>
          <Input id='inputImage'type="file" accept="image/*" disableUnderline={true}/>
          <FileUploadIcon/>
        </IconButton> */}
          <Button id='Postbutton'
          sx={{mt:8, bgcolor:'secondary.main', fontFamily: "Nunito",
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
