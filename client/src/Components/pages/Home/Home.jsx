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
import Payments from "./Payments";


export default function Home() {
  const { user, logOut } = useUserAuth();
  const [profileUser, setProfileUser] = useState({})
  localStorage.setItem('user', JSON.stringify(profileUser))
  let token = user.accessToken;

  useEffect(() => {
    const Config2 = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config2).then(res => setProfileUser(res.data))

      .catch(function(err) {
      });
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
          <div className="rightHome"> {profileUser.role === "user" ? <></> : <Payments />}</div>
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
