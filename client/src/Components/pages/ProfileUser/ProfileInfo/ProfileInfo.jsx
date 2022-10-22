import React from 'react'
import { CardMedia } from "@mui/material";
import './ProfileInfo.css'

const ProfileInfo = ({userInfoRen}) => {
    
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

          <div className='plus'><p>{userInfoRen.followeds?.length}</p>
          <p className='plusText'>Followers</p></div>

          <div className='plus'><p>{userInfoRen.follows?.length}</p>
           <p className='plusText'>Followeds</p></div>

           <div className='plus'><p>{userInfoRen.posts?.length}</p>
          <p className='plusText'>Posts</p></div>

          <div className='plus'><p>{userInfoRen.events?.length}</p>
          <p className='plusText'>Events created</p></div>

          <div className='plus'><p>{userInfoRen.asistEvent?.length}</p>
          <p className='plusText'>Events that will attend</p></div>
            </div>
				</div>
    </div>
  )
}

export default ProfileInfo