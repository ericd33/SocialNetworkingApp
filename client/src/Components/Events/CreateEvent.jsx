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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { grey, yellow } from "@mui/material/colors";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import "./CreateEvent.css";
import { postEvent } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { getMyUser } from "../../Redux/actions";
import { useUserAuth } from "../../context/UserAuthContext";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Search } from "./map/search";
import React, { useContext, useRef } from "react";
import { MapaContext } from "./map/contex/MapaContext";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { searchPlaces } from "./map/axios/searchPlaces";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// import e from "express";

export default function CreateEvent() {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [prev, setPrev] = useState(false);
  const { user } = useUserAuth();
  const token = user.accessToken;
  let userEmail = user.email;
  const myUser = useSelector(state => state.myUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventoLocation, setResults, location, setLocation, results } =
    useContext(MapaContext);
  const userImage = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getMyUser(userEmail));
  }, []);
  const opencloseModal = () => {
    setModal(!modal);
  };
  const timeOutRef = useRef();
  const [locations, setLocations] = useState([
    {
      center: "",
      place_name: "",
      text: "",
    },
  ]);
  async function search() {
    if (timeOutRef.current) {
      clearInterval(timeOutRef.current);
    }
    if (!location) return;
    timeOutRef.current = setTimeout(async () => {
      const { data } = await searchPlaces.get(`${location}.json`);
      setLocations(data.features);
      setResults(data.features.length > 0);
    }, 500);
  }

  const [formState, setFormState] = useState({
    name: "",
    content: "",
    username: myUser.name,
    email: userEmail,
    date: Date.now(),
    avatar: "",
    location: location,
    imageCloudinary: '',
    lat_log: eventoLocation,
    type: 'in-person',
    meet_link: "",
  });

  useEffect(() => {
    setFormState({
      ...formState,
      location: location,
      lat_log: eventoLocation,
    });
  }, [location]);

  function handleDateChange(e) {
    setFormState({
      ...formState,
      date: e._d,
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      email: userEmail,
      location: location,
      lat_log: eventoLocation,
      avatar: userImage.image,
    });
    console.log(formState);
  };

  const handleSetLocation = (e) => {
    e.preventDefault();

    setLocation(e.target.innerHTML || e.target.value);
    setFormState({
      ...formState,
      location: e.target.value || e.target.innerHTML,
      lat_log: eventoLocation,
      email: userEmail,
    });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    setModal(!modal);
    dispatch(postEvent(formState, token));
    // navigate("/events")
    setFormState({
      name: "",
      content: "",
      username: myUser.name,
      email: userEmail,
      date: Date.now(),
      avatar: "",
      location: location,
      imageCloudinary: "",
      lat_log: eventoLocation,
      meet_link: "",
      type: '',
    });
  };

  const submitFile = async (e) => {
    let FILE = await e.target.files[0];
    const formdata = new FormData();
    formdata.append("imageCloudinary", FILE);
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/file`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: formdata,
    };
    await axios(Config)
      .then((res) => {
        setTimeout(() => {
          setFormState({
            ...formState,
            imageCloudinary: `${res.data}`,
          });
        }, 1000);
        setPrev(true);
      })
      .catch((err) => {});
  };

  function onClicked(e) {
		if(e.target.checked === true) {
			setFormState({
        ...formState,
        type: 'online'
      })
		} else{
			setFormState({
        ...formState,
        type: 'in-person'
      })
		}
	  }

  const body = (
    <Card
      className="eventCreator"
      sx={{
        width: 600,
        height: 550,
        borderRadius: "15px",
        bgcolor: "custom.main",
        fontFamily: "Nunito",
        color: "primary.light",
        padding: 5,
        pt: 1,
      }}
    >
      <CardContent
        sx={{
          padding: 0,
        }}
      >
        <div className="headerModalEvent">
          <div className="TitleCreateEvent">
            <h2>Create an event</h2>
            <Icon>
              <DriveFileRenameOutlineIcon />
            </Icon>
          </div>
          <IconButton
            id="closeIcon"
            sx={{
              width: "35px",
              height: "35px",
              top: "20px",
              bgcolor: "custom.light",
            }}
            onClick={() => opencloseModal()}
          >
            <CloseIcon sx={{ pr: "1px" }} />
          </IconButton>
        </div>
        <div className="inputsdeEvents">
          <TextField
            id="filled-basic"
            label="Title"
            variant="filled"
            value={formState.name}
            name="name"
            type="text"
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
          <div className="date-modality">
            <div className='date-img'>
                <InputLabel htmlFor="date">Date</InputLabel>
                <DateTimePicker
                  minDate={Date.now()}
                  onChange={handleDateChange}
                  name="date"
                  value={formState.date}
                  renderInput={(params) => <TextField {...params} />}
                />
                <div className="Input-Imagen">
                  <label id='labelInput' for="inputTag">
                    Upload image
                    <FileUploadIcon/>
                    <input id="inputTag" type="file" name="imageCloudinary" onChange={(e) => submitFile(e)} accept="image/png, image/jpg, image/gif, image/jpeg"/>
                  </label>

                  {prev ? (
                    <img src={formState.imageCloudinary} className="img" />
                  ) : null}
                </div>
            </div>

            <div className="modality-location">
              <p>Modality</p>
              <div className="switchEvents">
                <div className="wrap-toggle">
                  <label>Physical Location</label>
                  <input type='checkbox' onClick={onClicked} id='toggle' className="offscreen"></input>
                  <label for='toggle' className="switch"></label>
                  <label> Online </label>
                </div>
              </div>
              {formState.type === "in-person" ? (
                <div>
                  <TextField
                    id="filled-basic"
                    label="Location"
                    variant="filled"
                    value={location}
                    name="location"
                    type="search"
                    onKeyUp={search}
                    className="textField"
                    onChange={handleSetLocation}
                  />
                  <div className="results-location">
                    {locations.length && results
                      ? locations.map(({ place_name, text, center }, i) => (
                          <Search
                            place_name={place_name}
                            text={text}
                            center={center}
                            i={i}
                          />
                        ))
                      : location &&
                        results && (
                          <div>
                            <p className="parrafo">No encontrado</p>
                            <p className="parrafo">{location}</p>
                          </div>
                        )}
                  </div>
                </div>
              ) : (
                <div>
                  <TextField
                    id="filled-basic"
                    label="Meet link"
                    className="textField"
                    variant="filled"
                    value={formState.meet_link}
                    name="meet_link"
                    type="url"
                    onChange={handleChange}
                  />
                </div>
              )}
            </div>

          </div>
        </div>

        
        <Button
            id="Postbutton"
            sx={{
              bgcolor: "secondary.main",
              fontFamily: "Nunito",
              color: "custom.dark",
            }}
            onClick={handleSubmit}
            variant="contained"
          >
            Post
          </Button>
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
