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


// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   zIndex: 1,
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: grey[200],
//   backgroundColor: grey[800],
//   borderRadius: 25,
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

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
        console.log('imagen cargada')
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
            <IconButton>
                <SearchIcon color="secondary" />
            </IconButton>
            {/* <Search sx={{ marginLeft: 5, borderRadius: 5 }}>
              

              {window.location.href === `http://localhost:3000/events` ? (
                <StyledInputBase
                  placeholder="Search events..."
                  color="primary"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleInputEvents}
                />
              ) : (
                <StyledInputBase
                  placeholder="Search users..."
                  color="primary"
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleInputPersons}
                />
              )}
            </Search> */}
          </Toolbar>

          <Toolbar>
            {/* <IconButton color="secondary" component={Link}>
              <NotificationsNoneIcon />
            </IconButton> */}
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
