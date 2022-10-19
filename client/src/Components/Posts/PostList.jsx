import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPosts } from "../../Redux/actions";
import { getAuth } from "firebase/auth";
export default function PostList() {
  const all_posts = useSelector((state) => state.filtered_posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAuth().currentUser.accessToken;
    dispatch(getPosts(token));
  }, [dispatch]);

  if (!all_posts) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  } else {
    return (
      <div>
        {all_posts
          .map((p) => {
            return (
              <Post
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
    );
  }
}
