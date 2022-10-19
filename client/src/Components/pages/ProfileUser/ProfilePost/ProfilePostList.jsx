import React, { useEffect, useState, useParams } from "react";
import axios from "axios";
import Post from "../../../Posts/Post";
import { getAuth } from "firebase/auth";

// import { useEffect } from "react";
// import { getPosts } from "../../Redux/actions";
// import {getAuth} from 'firebase/auth'

const ProfilePostList = ({ posts }) => {
    console.log(posts)
  if (!posts) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        {posts.map((p) => {
              return (
                <Post
                  text={p.content}
                  author={p.author}
                  comments={p.comments}
                  likes={p.likes}
                  image={p.image}
                  id={p._id}
                />
              );
            })
            .reverse()}
      </div>
    );
  }
};

export default ProfilePostList;
