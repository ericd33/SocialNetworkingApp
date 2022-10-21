import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useDispatch } from "react-redux";

import { postUser } from "../Redux/actions";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="pass"
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" />
          
        </div>
      </form>
    </div>
  );
}
