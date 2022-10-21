import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import GoogleButton from 'react-google-button'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleLogIn } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleButton = async (e) => {
    e.preventDefault();
    try{
      await googleLogIn();
      navigate("/home")
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>  
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username : </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Password : </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
          <GoogleButton onClick={handleGoogleButton}/>
        </div>
      </form>
    </>
  );
}
