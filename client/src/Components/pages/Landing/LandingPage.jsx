import React, {useState} from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useEffect } from "react";
import Home from '../Home/Home';
import { useDispatch } from "react-redux";
import { postUser } from "../../../Redux/actions";

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
        window.localStorage.setItem("user", JSON.stringify(user))
        
        setCurUser(user)
        // ...
        const token = getAuth().currentUser.accessToken
        window.localStorage.setItem("token", JSON.stringify(token))

        dispatch(postUser(user,token))
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  let user = window.localStorage.getItem('user')
  user = JSON.parse(user)

  if (curUser) {
    return <Home info={user}/>
  } else {
    return (
      <div>
        <button onClick={signIn}>Sign in</button>
      </div>
    );
  }
}
