import React, { useEffect } from 'react'
import NavBar from "../../navbar/Navbar";
import NavBarMobile from "../../navbar/Navbar mobile";
import { getAuth } from "firebase/auth";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from "react-redux";
import { getMyUser } from "../../../Redux/actions"
import ProfilePostList from './ProfilePost/ProfilePostList';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import { useUserAuth } from '../../../context/UserAuthContext';
import './Profile.css';
import ProfileDescription from './ProfileDescription/ProfileDescription';
import FilterEventsProfile from './EventsProfile/FilterEventsProfile';
import EventsProfile from './EventsProfile/EventsProfile';
import EventList from '../../Events/EventList';
import { Button } from '@mui/material';


const Profile = () => {
  const dispatch = useDispatch()
  const {user, logOut} = useUserAuth();
  let token = user.accessToken;
  const myUser = useSelector(e=>e.myUser)
  const [profileUser, setProfileUser] = useState({})
  const [posts, setPosts] = useState([])
  let query = useParams();
  const userP = JSON.parse(window.localStorage.getItem("user"))
  const [render, setRender] = useState('posts');


  const handleClick = (e) => {
    if(e.target.id === 'posts') {
      setRender('posts');
    }
    if(e.target.id==="events") {
      setRender('events');
    }
    if(e.target.id==="favorites"){
      setRender("favorites")
      dispatch(getMyUser(token, user.email))
    }
  }


  useEffect(()=>{
    //token,query.email
    const Config = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${query.email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config).then(res => setProfileUser(res.data))

    const Config2 = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/email/${query.email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(Config2).then((res) => {
        setPosts(res.data)});
},[dispatch])

function signOut() {
  logOut();
  localStorage.clear();
}
if(userP.enabled !== false) {
  return (
    <div>
      <div className="Home">
        <div className="navbar">
          <NavBar />
          <span></span>
        </div>
        <div className="navbarMobile">
          <NavBarMobile />
          <span></span>
        </div>
        <div className="media-part-pc">
          <div className="leftHome">
            <ProfileInfo userInfoRen={profileUser}/>
            {/* <EventsMenu /> */}
          </div>
          <div className="centerHome">
            <h3>Filters</h3>
            <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='posts' onClick={handleClick}>Posts</Button>
            <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='events' onClick={handleClick}>Events</Button>
            <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='favorites' onClick={handleClick}>Favorites</Button>
            <ProfilePostList render={render} posts={posts} myUser={myUser}/>
          </div>
          <div className="rightHome">
            <ProfileDescription userInfoRen={profileUser}/>
            {/* <FilterEventsProfile userInfoRen={profileUser} />
            <EventsProfile /> */}
          </div>
      </div>
        

        <div className="media-part-mobile">
          <div className="centerHome">
            <ProfileInfo userInfoRen={profileUser}/>
            <ProfileDescription userInfoRen={profileUser}/>
            <div className='containerMobileProfile'>
              <h3>Filters</h3>
              <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='posts' onClick={handleClick}>Posts</Button>
              <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='events' onClick={handleClick}>Events</Button>
              <Button variant="outlined"  sx={{ml:'5px', mr:'15px', mb:'15px', color:'secondary.main', border:'1px solid #ffd000'}} id='favorites' onClick={handleClick}>Favorites</Button>
              <ProfilePostList render={render} posts={posts} myUser={myUser}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}
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

export default Profile
