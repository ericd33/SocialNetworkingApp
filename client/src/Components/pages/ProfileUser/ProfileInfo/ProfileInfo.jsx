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
          <p>Followers:{userInfoRen.followeds?.length}</p>
          <p>Follows:{userInfoRen.follows?.length}</p>
          <p>Posts:{userInfoRen.posts?.length}</p>
          <p>Events created:{userInfoRen.events?.length}</p>
          <p>Events that will attend:{userInfoRen.asistEvent?.length}</p>
            </div>
				</div>
    </div>
  )
}

export default ProfileInfo