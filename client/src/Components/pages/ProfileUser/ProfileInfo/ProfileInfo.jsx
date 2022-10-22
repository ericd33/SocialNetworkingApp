import React from 'react'
import { CardMedia } from "@mui/material";
import './ProfileInfo.css'
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { useState } from 'react';
import { useEffect } from 'react'
import Follow from '../../Home/follow';
const ProfileInfo = ({userInfoRen}) => {
  const {user} = useUserAuth();
  let email = useParams()
  const [myUser, setMyUser]=useState(true)
  useEffect(()=>{
    if(email.email===user.email){setMyUser(false)}
  },[myUser,email,user])
  console.log(myUser)
  return (
    <div className='userCard'>
        {userInfoRen.image ? (
        <CardMedia  className='user' component="img" alt="image" image={userInfoRen.image} />
        ) : (
          <div></div>
        )}
				<div className='userInfo'>
					<p>{userInfoRen.name}</p>
            <div className='userPlusInfo'>
          <div className='followers'>
           <div><p>{userInfoRen.followeds?.length}</p>
          <p className='plusText'>Followers</p></div> 

          <div><p>{userInfoRen.follows?.length}</p>
           <p className='plusText'>Following</p>
          </div></div>

           <div className='plus'><p>{userInfoRen.posts?.length}</p>
          <p className='plusText'>Posts</p></div>

          <div className='plus'><p>{userInfoRen.events?.length}</p>
          <p className='plusText'>Events created</p></div>

          <div className='plus'><p>{userInfoRen.asistEvent?.length}</p>
          <p className='plusText'>Events that will attend</p></div>
            </div>
            {
            !myUser
              ? <div></div>
              : <Follow email={userInfoRen.email}/>
          }
				</div>
    </div>
  )
}

export default ProfileInfo
