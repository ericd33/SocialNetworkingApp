import React from 'react'
import './ProfileDescription.css'
import { useParams } from 'react-router-dom';
import { useUserAuth } from '../../../../context/UserAuthContext';
import { useState } from 'react';
import { useEffect } from 'react'


const ProfileDescription = ({userInfoRen}) => {
  const {user} = useUserAuth();
  let email = useParams()
  const [myUser, setMyUser]=useState(true)
  useEffect(()=>{
    if(email.email===user.email){setMyUser(false)}
  },[myUser,email,user])
  // console.log(myUser)
  // console.log('user',userInfoRen)

  return (
    <div className='userCardDescription'>
        {userInfoRen.presentation ? (
          <div className='boxDescription'>
            <h2>Presentation</h2>
            <p>{userInfoRen.presentation}</p>
          </div>
        ) : (
          <div></div>
        )}
        {userInfoRen.website ? (
          <div className='boxDescription'>
            <h2>WebSite</h2>
            <p>{userInfoRen.website}</p>
          </div>
        ) : (
          <div></div>
        )}
    </div>
  )
}

export default ProfileDescription
