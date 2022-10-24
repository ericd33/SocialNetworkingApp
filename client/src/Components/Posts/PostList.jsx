import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../Redux/actions";
import "./PostList.css";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";

export default function PostList() {
  const all_posts = useSelector((state) => state.posts);
  // console.log(all_posts.comments)
  const dispatch = useDispatch();
  const {user} = useUserAuth();
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

return (
  <div>
    {all_posts.length === 0 ? (
      <div className="List">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
    ) : (
      <div className="List">
        {/* {console.log(all_posts)} */}
        {all_posts
          .map((p) => {
            switch(profileUser.role){
            case "admin":
            return (
              <Post
                key={p._id}
                author={p.author}
                likes={p.likes}
                comments={p.comments}
                text={p.content}
                image={p.image}
                id={p._id}
                enabled={p.enabled}
              />
            )
          case "user":
            if(p.enabled)
            return(
            <Post
                key={p._id}
                author={p.author}
                likes={p.likes}
                comments={p.comments}
                text={p.content}
                image={p.image}
                id={p._id}
                enabled={p.enabled}
              />)
            
              default: return <></>
        }
          })
          .reverse()}
      </div>
    )}
  </div>
);
}