import ProfilePost from "./ProfilePost";
import React from 'react'
// import {useDispatch, useSelector} from 'react-redux';
// import { useEffect } from "react";
// import { getPosts } from "../../Redux/actions";
// import {getAuth} from 'firebase/auth'

const ProfilePostList = ({userInfoRen}) => {
  // const all_posts = useSelector((state) => state.filtered_posts);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //       const token = getAuth().currentUser.accessToken
  //       dispatch(getPosts(token));
  //   },[dispatch])

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
                    userInfoRen.posts.map((p) => {
                            return <ProfilePost idPost={p._id} />
                    }).reverse()
                }
            </div>
        )
    }
}

export default ProfilePostList