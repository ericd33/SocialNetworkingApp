import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../Redux/actions";
import { getAuth } from "firebase/auth";
import "./PostList.css";

export default function PostList() {
  const all_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = window.localStorage.getItem("token");
    token = token.slice(1, -1);

    dispatch(getPosts(token));
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
          {all_posts
            .map((p) => {
              return (
                <Post
                  key={p._id}
                  author={p.author}
                  likes={p.likes}
                  comments={p.comments}
                  text={p.content}
                  image={p.image}
                  id={p._id}
                />
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
}
