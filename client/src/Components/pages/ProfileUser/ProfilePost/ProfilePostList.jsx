import React, { useEffect, useState, useParams } from "react";
import axios from "axios";
import Post from "../../../Posts/Post";
import { getAuth } from "firebase/auth";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../../Redux/actions";

// import { useEffect } from "react";
// import { getPosts } from "../../Redux/actions";
// import {getAuth} from 'firebase/auth'

const ProfilePostList = ({ posts }) => {
  const {user} = useUserAuth();
  const dispatch = useDispatch();
  const [profileUser, setProfileUser] = useState({})

  useEffect(() => {
    let token = user.accessToken;
    dispatch(getPosts(token));
    
    const Config2 = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config2).then(res => setProfileUser(res.data))
  }, [dispatch]);
    //console.log(posts)
  if (posts.length === 0) {
    return (
      <div>
        <h2>There is no posts</h2>
      </div>
    );
  } else {
    return (
      <div>
        {posts.map((p) => {
          switch(profileUser.role){
            case "admin":
              return (
                <Post
                  text={p.content}
                  author={p.author}
                  comments={p.comments}
                  likes={p.likes}
                  image={p.image}
                  id={p._id}
                  enabled={p.enabled}
                />
              );
              case "user":
            if(p.enabled)return(
                <Post
                  text={p.content}
                  author={p.author}
                  comments={p.comments}
                  likes={p.likes}
                  image={p.image}
                  id={p._id}
                  enabled={p.enabled}
                />
            )
            default: return <></>
            }})
            .reverse()}
      </div>
    );
  }
};

export default ProfilePostList;
