import React, {useState} from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect } from "react";
import Home from '../Home/Home';
import { useDispatch } from "react-redux";

export default function LandingPage() {
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();

  ///INFO DE LA SESION
  const auth = getAuth();

  
  const [curUser, setCurUser] = useState();

  //CUANDO INICIA LA PAGINA SE GUARDA EL USUARIO QUE ESTA EN LA SESION EN EL ESTADO
  useEffect(()=> {

    setCurUser(getAuth().currentUser)
  },[])



  //AUTHSTATECHANGED SE LLAMA CUANDO SE HACE EL LOGIN
  auth.onAuthStateChanged(function(user) {

    //GUARDO EL USUARIO EN EL ESTADO
    if (user) {
      setCurUser(user)
    }
    }
  );


    //LOGIN
  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        ///REVISAR SI EL USUARIO ES NUEVO
        if (user.metadata.creationTime ===user.metadata.lastSignInTime) {
            console.log('Usuario se acaba de registrar')
        } else {
            console.log('Usuario existente logueado')
        }

        setCurUser(user)
        // ...
        dispatch(user)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  if (curUser) {
    return <Home/>
  } else {
    return (
      <div>
        <button onClick={signIn}>Sign in</button>
      </div>
    );
  }
}
