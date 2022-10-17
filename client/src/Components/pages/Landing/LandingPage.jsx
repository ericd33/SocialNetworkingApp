import React from "react";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";

export default function LandingPage() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  function signOut() {
    signOut();
  }

  return <div>
    <button onClick={signIn}>Sign in</button>
    <button onClick={signOut}>Sign out</button>
    </div>;
}
