import ProfilePost from "./ProfilePost";
import React, { useEffect } from 'react'
import { getAuth } from "firebase/auth";
import { getMyUser } from "../../../../Redux/actions";
import {useDispatch, useSelector} from 'react-redux';
import Post from "../../../Posts/Post";
// import { useEffect } from "react";
// import { getPosts } from "../../Redux/actions";
// import {getAuth} from 'firebase/auth'

const ProfilePostList = ({userInfoRen}) => {
    const dispatch = useDispatch();
    //   useEffect(() => {
        //       const token = getAuth().currentUser.accessToken
        //       dispatch(getPosts(token));
        //   },[dispatch])
        
        const email = getAuth().currentUser.email
        const token = getAuth().currentUser.accessToken
        
        useEffect(()=>{
            dispatch(getMyUser(token,email))
        },[])
        
        const myUser = useSelector((state) => state.myUser);
        console.log(myUser)
    if (!userInfoRen.posts) {
        return(
            <div>
                <h2>
                    Loading...
                </h2>
            </div>
        )
    }
    else {
        return (
            <div>
                {
                    myUser.posts.map((p) => {
                            return <Post text={p.content} author={p.author} comments={p.comments} likes={p.likes} image={p.image} id={p._id} />
                    }).reverse()
                }
            </div>
        )
    }
}

export default ProfilePostList