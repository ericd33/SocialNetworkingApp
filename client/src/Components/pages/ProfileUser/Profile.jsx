import React, { useEffect } from 'react'
import NavBar from "../../navbar/Navbar";
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
  const {user} = useUserAuth();
  let token = user.accessToken;
  const [profileUser, setProfileUser] = useState({})
  const [posts, setPosts] = useState([])
  let query = useParams();

  const [render, setRender] = useState('posts');


  const handleClick = (e) => {
    if(e.target.id === 'posts') {
      setRender('posts');
    }
    else {
      setRender('events');
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


return (
  <div>
    <div className="Home">
      <div className="navbar">
        <span></span>
      </div>
      <NavBar />
      <div className="media-part">
        <div className="leftHome">
          <ProfileInfo userInfoRen={profileUser}/>
          {/* <EventsMenu /> */}
        </div>
        <div className="centerHome">
          <Button variant="outlined" id='posts' onClick={handleClick}>Posts</Button>
          <Button variant="outlined" id='events' onClick={handleClick}>Events</Button>
          <ProfilePostList render={render} posts={posts}/>
        </div>
        <div className="rightHome">
          <ProfileDescription userInfoRen={profileUser}/>
          {/* <FilterEventsProfile userInfoRen={profileUser} />
          <EventsProfile /> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profile
