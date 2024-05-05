import React, { useState } from "react";
import Post from "../../../Posts/Post";
import EventsProfile from "../EventsProfile/EventsProfile";
import FilterEventsProfile from "../EventsProfile/FilterEventsProfile";
import './ProfilePostList.css';

const ProfilePostList = ({ render, posts, myUser }) => {
  const [profileUser, setProfileUser] = useState({})

  if (render === 'posts' && posts?.length === 0) {
    return (
      <div>
        <h2>There is no posts</h2>
      </div>
    );
  }
  if (render === 'posts') {
    return (
      <div className="postsProfile">
        <h2>Your Posts</h2>
        {posts?.map((p) => {
          switch (profileUser.role) {
            case "admin":
              return (
                <Post
                  key={p._id}
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
              if (p.enabled) return (
                <Post
                  key={p._id}
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
          }
        })
          .reverse()}
      </div>
    );
  }
  if (render === 'events') {
    return (
      <div>
        <h2>Your events</h2>
        <FilterEventsProfile userInfoRen={profileUser} />
        <EventsProfile />
      </div>
    )
  };

  if (render === "favorites") {
    return (
      <div className="postsProfile">
        <h2>Your Favorite Post</h2>
        {console.log(myUser)}
        {myUser?.liked?.map((p) => {
          switch (profileUser.role) {
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
              if (p.enabled) return (
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
          }
        })
          .reverse()}
      </div>
    );
  }
}

export default ProfilePostList;
