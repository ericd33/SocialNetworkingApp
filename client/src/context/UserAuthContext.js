import { createContext, useContext, useState, useEffect } from "react"
import { auth } from '../firebase/config';
import { getMyUser } from "../Redux/actions";
import { toast } from "react-hot-toast";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, GoogleAuthProvider, signInWithPopup,
    sendEmailVerification,
} from 'firebase/auth'
import { useDispatch } from "react-redux";
import { postUser } from '../Redux/actions'

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState();
    const [pending, setPending] = useState(true);
    async function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password).then(credential => {
            sendEmailVerification(credential.user)
            return credential
        })
    }

    function googleLogIn() {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider)
    }
    async function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then(credential => {
            if (!credential.user.emailVerified) {
                toast('Please check your email to verify your account.', {
                    icon: "⚠️"
                })
            }
            return credential
        }).catch(() => {
            toast.error('Invalid user or email')

        })
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            let tuser = currentUser;
            if (currentUser && !currentUser.emailVerified) {
                setUser(undefined);
                setPending(false)
                return
            }
            if (tuser && (tuser.metadata.creationTime == tuser.metadata.lastSignInTime)) {

                const userconfig = {
                    email: tuser.email,
                    name: tuser.displayName,
                    image: 'https://avatars.githubusercontent.com/u/16511727?v=4',
                }

                if (userconfig.name == null) userconfig.name = tuser.email.split('@')[0];
                if (tuser.photoURL != null) userconfig.image = tuser.photoURL;

                dispatch(postUser(userconfig, tuser.accessToken))
            }

            if (tuser) {

                dispatch(getMyUser(tuser.accessToken))
            }


            setUser(currentUser);
            setPending(false)
        })
        return () => {
            unsubscribe();
        }
    }, []);
    if (!pending) return <userAuthContext.Provider value={{ user, logOut, signUp, logIn, googleLogIn }}>{children}</userAuthContext.Provider>
    return <p>Loading...</p>

}

export function useUserAuth() {
    return useContext(userAuthContext)
}
