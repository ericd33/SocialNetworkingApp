import React,{ useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import LandingLogin from './LandingLogin';
import LandingRegister from './LandingRegister';



const LandingPage = () => {

  const[ login_register, setLogin_register] = useState(true)

  const loginOrRegister = (e) =>{
    e.preventDefault();
    setLogin_register(!login_register)
  }
  return(
    <div>
      {login_register ? (<LandingLogin />) : <LandingRegister/> }
      {login_register ? <button onClick={(e) => loginOrRegister(e)}>Register</button> : <button onClick={(e) => loginOrRegister(e)}>Login</button>}
    </div>
  )
}

export default LandingPage