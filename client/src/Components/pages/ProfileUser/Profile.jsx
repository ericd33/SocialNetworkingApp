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


const Profile = () => {
  const dispatch = useDispatch()
  let token = window.localStorage.getItem('token')
  token=token.slice(1,-1)
  const [profileUser, setProfileUser] = useState({})
  const [posts, setPosts] = useState([])
  let query = useParams();
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
    console.log(Config2)
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
    <ProfilePostList posts={posts}/>
  </div>
  <div className="rightHome"></div>
</div>
</div>
    
  </div>
  )
}

export default Profile
