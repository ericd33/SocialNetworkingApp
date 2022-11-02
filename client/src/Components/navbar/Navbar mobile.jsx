import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  Modal,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { grey, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getEventsByName, searchUsersByName } from "../../Redux/actions";
import LogoutIcon from "@mui/icons-material/Logout";
import { getAuth } from "firebase/auth";
import './NavbarMobile.css';
import Donations from "../Donations/Donations"
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Searchbar from "./Searchbar";

const NavBarMobile = () => {
  const [AvatarImage, setAvatar] = useState();
  const dispatch = useDispatch();
  const { user, logOut } = useUserAuth();
  const token = user.accessToken;

  useEffect(() => {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config)
      .then((user) => {
        setAvatar(user.data.image);
        // console.log('imagen cargada')
      })
      .catch(function (err) {
      });
  }, []);

  ///LOGOUT
  function signOut() {
    logOut();
    localStorage.clear();
  }

  // const handleInputPersons = (e) => {
  //   dispatch(searchUsersByName(e.target.value, token));
  // };

  const handleInputEvents = (e) => {
    dispatch(getEventsByName(token, e.target.value));
  };

  return (
    <div className="navbarMobile">
      <AppBar sx={{ bgcolor: "custom.dark" }} position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Toolbar>
            <Link to={"/home"}>
              <Icon><HomeIcon/></Icon>
            </Link>
            {
              window.location.href === `http://localhost:3000/events` ? (
                null ) : (<IconButton>
                            <Searchbar/>
                          </IconButton>)
            }
          </Toolbar>

          <Toolbar>
            <Link to={"/events"}>
              <IconButton color="secondary">
                <EventNoteIcon/>
              </IconButton>
            </Link>
            <Donations />

            <Link to="/chat">
              <IconButton color="secondary">
                <ChatOutlinedIcon />
              </IconButton>
            </Link>

            <IconButton color="secondary" onClick={signOut}>
              <LogoutIcon />
            </IconButton>

            <Link to={`/profile/${user.email}`}>
              <Button sx={{ borderRadius: "25px", height: 50 }}>
                <Avatar src={AvatarImage}></Avatar>
              </Button>
            </Link>
          </Toolbar>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBarMobile;
