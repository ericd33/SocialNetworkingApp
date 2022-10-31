import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import { useSelector } from "react-redux";
import { Avatar, Card, CardHeader } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import Follow from "./follow";
import CreatePost from '../../Posts/CreatePost'
import CreateEvent from "../../Events/CreateEvent";
import { useUserAuth } from "../../../context/UserAuthContext";
import FilterPost from "./FilterPost";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBarMobile from "../../navbar/Navbar mobile";
import AboutUs from "../../AboutUs/AboutUs";


export default function Home() {
  const {user} = useUserAuth();
  const [profileUser, setProfileUser] = useState({})

  let token = user.accessToken;
  console.log(token)
  useEffect(() => {
    const Config2 = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config2).then(res => setProfileUser(res.data))

    .catch(function (err) {
    });
}, []);
localStorage.setItem('user',JSON.stringify(profileUser))

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
          {/* <FilterPost /> */}
          <PostList />
        </div>
        <div className="rightHome"> <AboutUs/> </div>
      </div>
        <CreatePost  profileUser={profileUser}/>
    </div>
  );
}