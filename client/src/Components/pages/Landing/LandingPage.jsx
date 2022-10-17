import React, {useState} from "react";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";

export default function LandingPage() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [curUser, setCurUser] = useState();

  
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setCurUser(user)
    }
    });

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setCurUser(user)
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  function logOut() {
    auth.signOut();
  }

  if (curUser) {
    return <button onClick={logOut}>Sign out</button>;
  } else {
    return (
      <div>
        <button onClick={signIn}>Sign in</button>
      </div>
    );
  }
}
