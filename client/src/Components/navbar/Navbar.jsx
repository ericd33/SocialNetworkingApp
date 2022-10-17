import React from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchUsersByName } from "../../Redux/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';

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
  color: grey[700],
  backgroundColor: grey[200],
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
  const dispatch = useDispatch()
  const [search, setSearch] = useState("")

  
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <IconButton sx={{color: grey[800]}} onClick={() => logout({ returnTo: window.location.origin })}>
        <LogoutIcon/>
      </IconButton>
    );
    };
    
    const handleInput = (e)=>{
      setSearch(e.target.value)
      dispatch(searchUsersByName(search))
    }

  return (
    <AppBar sx={{ bgcolor: yellow[500], color: grey[800] }} position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Toolbar>
          <div>
            <Link to={"/home"}>
                <h2>ConCatUs</h2>
            </Link>
          </div>
          <Search sx={{ marginLeft: 5 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            {
              window.location.href === `http://localhost:3000/events` 
                ?
                <StyledInputBase
                placeholder="Search events..."
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={handleInput}
              /> :
                <StyledInputBase
                  placeholder="Search persons..."
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={handleInput}
                />
            }
          </Search>
        </Toolbar>

        <Toolbar>
          <IconButton color="inherit" component={Link} to="/home">
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton color="inherit" component={Link}>
            <ChatOutlinedIcon />
          </IconButton>

          {LogoutButton()}
          
          <Button
            sx={{ ml: "35px", borderRadius: "25px", height: 50 }}
            component={Link}
          >
            <Avatar>H</Avatar>
          </Button>
        </Toolbar>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
