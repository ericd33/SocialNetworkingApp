import Post from "./Post";
import { useEffect, useState } from "react";
import { v4 } from 'uuid';
import "./PostList.css";
import { useUserAuth } from "../../context/UserAuthContext";
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Redux/actions";
export default function PostList() {
  const dispatch = useDispatch()
  const { user } = useUserAuth();
  const [profileUser, setProfileUser] = useState({})
  let [page, setPage] = useState(0)
  const all_posts = useSelector(e => e.posts.posts)
  const [post, setPost] = useState([])
  let token = user.accessToken;
  const usr = useSelector((store) => store.myUser);
  const posts = useSelector(state => state.posts);

  function fetchMoreData() {
    setTimeout(() => {
      setPage(prevCount => {
        dispatch(getPosts(token, prevCount + 1))
        return prevCount + 1
      })
    }, 4500)
  }
  function appendNewPosts() {
    if (all_posts) {
      setPost(post?.concat(all_posts))
    }
  }

  useEffect(() => {
    dispatch(getPosts(token, page))
  }, [])

  useEffect(() => {
    appendNewPosts()
  }, [posts])

  useEffect(() => {
    setProfileUser(usr)
  }, [usr])



  return (
    <InfiniteScroll
      dataLength={post.length}
      hasMore={post.length < posts.total}
      next={fetchMoreData}
      endMessage={
        <p style={{ textAlign: 'center', color: 'white' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      loader={<div className="List">
        <div className="wrapper">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
          <div className="shadow"></div>
        </div>
      </div>
      }
    >
      {post?.map((p) => {

        return <Post
          key={p._id || v4()}
          author={p.author}
          likes={p.likes}
          text={p.content}
          created={p.createdAt}
          comments={p.comments}
          image={p.image}
          id={p._id}
          enabled={p.enabled}
          disable={p.disable}
        />
      })
      }
    </InfiniteScroll>
  );
}
