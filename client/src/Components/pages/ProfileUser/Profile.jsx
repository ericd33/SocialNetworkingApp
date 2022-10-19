import React, { useEffect } from 'react'
import NavBar from "../../navbar/Navbar";
import { getAuth } from "firebase/auth";
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { useDispatch, useSelector } from "react-redux";
import { getMyUser } from "../../../Redux/actions"

const Profile = () => {
  const dispatch = useDispatch()

  const userInfo = getAuth().currentUser.reloadUserInfo
  const token = getAuth().currentUser.accessToken
  
  useEffect(()=>{
    dispatch(getMyUser(token,userInfo.email))
},[dispatch])

const userInfoRen= useSelector((state)=> state.myUser)

return (
  <div>
    {console.log(userInfoRen)}
    <div className="Home">
<div className="navbar">
  <span></span>
</div>
<NavBar />
<div className="media-part">
  <div className="leftHome">
    <ProfileInfo userInfoRen={userInfoRen}/>
    {/* <EventsMenu /> */}
  </div>
  <div className="centerHome">
    {/* <EventList /> */}
  </div>
  <div className="rightHome"></div>
</div>
</div>
    
  </div>
  )
}

export default Profile
