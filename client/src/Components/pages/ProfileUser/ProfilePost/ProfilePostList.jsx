import React, { useEffect, useState, useParams } from "react";
import axios from "axios";
import Post from "../../../Posts/Post";
import { getAuth } from "firebase/auth";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { useDispatch } from "react-redux";
import { getPosts } from "../../../../Redux/actions";
import EventsProfile from "../EventsProfile/EventsProfile";
import FilterEventsProfile from "../EventsProfile/FilterEventsProfile";
import './ProfilePostList.css';



const ProfilePostList = ({render, posts}) => {
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
  if (render === 'posts' && posts.length === 0) {
    return (
      <div>
        <h2>There is no posts</h2>
      </div>
    );
  }
  if(render === 'posts') {
    return (
      <div className="postsProfile">
        <h2>Your Posts</h2>
        {posts.map((p) => {
          switch(profileUser.role){
            case "admin":
              return (
                <Post
                created={p.createdAt}
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
                created={p.createdAt}
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
  else {
    return(
      <div>
        <h2>Your events</h2>
        <FilterEventsProfile userInfoRen={profileUser} />
        <EventsProfile/>
      </div>
    )
};
}

export default ProfilePostList;
