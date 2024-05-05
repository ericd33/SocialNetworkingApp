import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import { Button } from "@mui/material";
import CreatePost from '../../Posts/CreatePost'
import { useUserAuth } from "../../../context/UserAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBarMobile from "../../navbar/Navbar mobile";
import { myUserCached } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";



export default function Home() {
  const { user, logOut } = useUserAuth();
  const [profileUser, setProfileUser] = useState({})
  localStorage.setItem('user', JSON.stringify(profileUser))
  let token = user.accessToken;
  const dispatch = useDispatch()
  const usr = useSelector((store) => store.myUser)

  useEffect(() => {
    setProfileUser(usr)
  }, []);

  function signOut() {
    logOut();
    localStorage.clear();
  }

  if (profileUser.enabled !== false) {
    return (
      <div className="Home">
        <div className="navbar">
          <NavBar />
          <span></span>
        </div>
        <div className="navbarMobile">
          <NavBarMobile />
          <span></span>
        </div>
        <CreatePost />
        <div className="media-part">
          <div className="leftHome">
            <EventsMenu />
          </div>
          <div className="centerHome">
            <PostList />
          </div>
          <div className="rightHome"> {profileUser.role === "user" ? <></> : <></>}</div>
        </div>
        <CreatePost profileUser={profileUser} />
      </div>
    );
  }
  else {
    return (
      <div className='HomeBanned'>
        <div className="banMessage">
          <h1>Your account was banned. Contact with the staff</h1>
          <h3>concatuss@gmail.com</h3>
          <Button id='logoutBanned' variant='outlined' color="error" onClick={signOut}>
            Back
          </Button>
        </div>
      </div>
    )
  }
}
