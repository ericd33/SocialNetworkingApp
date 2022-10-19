import React from 'react'
import { CardMedia } from "@mui/material";

const ProfileInfo = ({userInfoRen}) => {
    
  return (
    <div>
        {userInfoRen.image ? (
        <CardMedia component="img" alt="image" height="400" image={userInfoRen.image} />
        ) : (
          <div></div>
        )}
				<div>
					prueba
				</div>
    </div>
  )
}

export default ProfileInfo