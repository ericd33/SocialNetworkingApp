import React, { useEffect } from 'react'
import NavBar from "../../navbar/Navbar";
import NavBarMobile from "../../navbar/Navbar mobile";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, getUserProfileInfo } from "../../../Redux/actions"
import ProfilePostList from './ProfilePost/ProfilePostList';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserAuth } from '../../../context/UserAuthContext';
import './Profile.css';
import ProfileDescription from './ProfileDescription/ProfileDescription';
import { Button } from '@mui/material';


const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useUserAuth();
  let token = user.accessToken;
  const myUser = useSelector(e => e.myUser)
  const profileUser = useSelector(state => state.profileInfo)
  let query = useParams();
  const [render, setRender] = useState('posts');


  const handleClick = (e) => {
    if (e.target.id === 'posts') {
      setRender('posts');
    }
    if (e.target.id === "events") {
      setRender('events');
    }
    if (e.target.id === "favorites") {
      setRender("favorites")
      dispatch(getMyUser(token, user.email))
    }
  }


  useEffect(() => {
    dispatch(getUserProfileInfo(token, query.email, { includePosts: true }))
  }, [dispatch, query.email, token])

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
            <ProfileInfo userInfoRen={profileUser} />
            {/* <EventsMenu /> */}
          </div>
          <div className="centerHome">
            <h3>Filters</h3>
            <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='posts' onClick={handleClick}>Posts</Button>
            <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='events' onClick={handleClick}>Events</Button>
            <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='favorites' onClick={handleClick}>Favorites</Button>
            <ProfilePostList render={render} posts={profileUser.posts} myUser={myUser} />
          </div>
          <div className="rightHome">
            <ProfileDescription userInfoRen={profileUser} />
          </div>
        </div>


        <div className="media-part-mobile">
          <div className="centerHome">
            <ProfileInfo userInfoRen={profileUser} />
            <ProfileDescription userInfoRen={profileUser} />
            <div className='containerMobileProfile'>
              <h3>Filters</h3>
              <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='posts' onClick={handleClick}>Posts</Button>
              <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='events' onClick={handleClick}>Events</Button>
              <Button variant="outlined" sx={{ ml: '5px', mr: '15px', mb: '15px', color: 'secondary.main', border: '1px solid #ffd000' }} id='favorites' onClick={handleClick}>Favorites</Button>
              <ProfilePostList render={render} posts={profileUser.posts} myUser={myUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
