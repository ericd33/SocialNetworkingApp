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
import { IconButton } from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import { grey, yellow } from "@mui/material/colors";
import { useAuth0 } from "@auth0/auth0-react";

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
  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
    );
  };
  return (
    <AppBar sx={{ bgcolor: yellow[500], color: grey[800] }} position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {LogoutButton()}
        <Toolbar>
          <div>
            <a href="/home">
              <h2>ConCatUs</h2>
            </a>
          </div>

          <Search sx={{ marginLeft: 5 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>

        <Toolbar>
          <IconButton color="inherit" component={Link} to="/home">
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton color="inherit" component={Link}>
            <ChatOutlinedIcon />
          </IconButton>

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
