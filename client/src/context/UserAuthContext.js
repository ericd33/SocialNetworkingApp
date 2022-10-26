import {createContext, useContext, useState, useEffect} from "react"
import {auth} from '../firebase/config'
import { createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from "react-redux";
import { postUser } from '../Redux/actions'

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [pending, setPending] = useState(true);
    function signUp(username, email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function googleLogIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }
    function logIn(email, password) {
        
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const tuser = currentUser;
            if (tuser && (tuser.metadata.creationTime == tuser.metadata.lastSignInTime)) {
                console.log('creating user')
                console.log(tuser)
                const userconfig = {
                    email:tuser.email,
                    name:tuser.displayName,
                    image:'https://avatars.githubusercontent.com/u/16511727?v=4',
                }

                if (userconfig.name == null) userconfig.name = tuser.email.split('@')[0];
                if (tuser.photoURL != null) userconfig.image = tuser.photoURL;
    
                dispatch(postUser(userconfig, tuser.accessToken))
            }
            
            setUser(currentUser);
            setPending(false)
        })
        return () => {
            unsubscribe();
        }
    },[]);
    if (!pending) return <userAuthContext.Provider value={{user, logOut, signUp, logIn, googleLogIn}}>{children}</userAuthContext.Provider>
    return <p>Loading...</p>
    
}

export function useUserAuth() {
    return useContext(userAuthContext)
}