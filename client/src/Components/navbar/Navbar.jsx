import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Card, CardContent, CardHeader, IconButton, Modal } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { grey, yellow } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchUsersByName } from "../../Redux/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { getAuth, signOut } from "firebase/auth";
import './Navbar.css';
import axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: grey[200],
  backgroundColor: grey[800],
  borderRadius: 25,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const NavBar = () => {
  const [AvatarImage, setAvatar] = useState();
  const dispatch = useDispatch()
  const {user} = useUserAuth();
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
      .then(user => {
        // console.log(user.data)
        setAvatar(user.data.image);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  ///LOGOUT
  function logOut() {
    window.location.reload(false)
    localStorage.clear();
  }

  const handleInput = (e)=>{
    dispatch(searchUsersByName(e.target.value,token))
  }

  return (
    <AppBar sx={{ bgcolor: 'custom.dark'}} position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <div>
            <Link to={"/home"} >
                <h2>ConCatUs</h2>
            </Link>
          </div>
          <Search sx={{ marginLeft: 5 , borderRadius:5}}>
            <SearchIconWrapper>
              <SearchIcon color="secondary"/>
            </SearchIconWrapper>
            {
              window.location.href === `http://localhost:3000/events` 
                ?
                <StyledInputBase
                placeholder="Search events..."
                color='primary'
                inputProps={{ "aria-label": "search" }}
                onChange={handleInput}
              /> :
                <StyledInputBase
                  placeholder="Search persons..."
                  color='primary'
                  inputProps={{ "aria-label": "search" }}
                  onChange={handleInput}
                />
            }
          </Search>
        </Toolbar>

        <Toolbar>
          <IconButton color="secondary" component={Link}>
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton color="secondary" component={Link}>
            <ChatOutlinedIcon />
          </IconButton>
          
          <IconButton color="secondary" onClick={logOut}>
            <LogoutIcon/>
          </IconButton>
          
          <Button
            sx={{ ml: "35px", borderRadius: "25px", height: 50 }}
            component={Link}
          >
            <Avatar src={AvatarImage} component={Link} to={`/profile/${user.email}`}></Avatar>

          </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
