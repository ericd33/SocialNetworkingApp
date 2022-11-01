import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getPosts, paginate } from "../../Redux/actions";
import "./PostList.css";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux";
import { paginate } from "../../Redux/actions";
export default function PostList() {
  const dispatch =  useDispatch()
  const {user} = useUserAuth();
  const [profileUser, setProfileUser] = useState({})
  let [page, setPage]= useState(2)
  const all_posts = useSelector(e=>e.posts)
  const [post, setPost]= useState([])
  let token = user.accessToken;
  useEffect(() => {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/paginate`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data:{
        paginate:1
      }
    };
    axios(Config).then(res=>{
      setPost(post.concat(res.data))
    })

    const Config2 = {
      method: 'get',
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${user.email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    }
    axios(Config2).then(res => setProfileUser(res.data))
  }, [])
  useEffect(()=>{
    dispatch(paginate(token,page))
    setPost(post?.concat(all_posts))
  },[page])
return (
  <InfiniteScroll 
  dataLength={post?.length} 
  hasMore={true} 
  next={()=>{setPage((prevPage)=>prevPage+1)}}
  >
  <div>
    {post?.length === 0 ? (
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
        {post?.map((p) => {
            if(profileUser?.enabled){
              switch(profileUser.role){
              case "admin":
              return (
                <Post
                  key={p._id}
                  author={p.author}
                  likes={p.likes}
                  text={p.content}
                  comments={p.comments}
                  image={p.image}
                  id={p._id}
                  enabled={p.enabled}
                  disable={p.disable}
                />
              )
            case "user":
              if(p?.enabled && !p.disable.some(e=>e===profileUser.email))
              return(
              <Post
                  key={p._id}
                  author={p.author}
                  created={p.createdAt}
                  comments={p.comments}
                  likes={p.likes}
                  text={p.content}
                  image={p.image}
                  id={p._id}
                  enabled={p.enabled}
                  disable={p.disable}
                />)
                {console.log(profileUser)}
                default: return <></>
          }
            }else{
              return (
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
              ) 
            }
          })
          }
      </div>
    )}
  </div>
  </InfiniteScroll>
);
}