import Post from "./Post";
// import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getPosts, paginate } from "../../Redux/actions";
import "./PostList.css";
import { useUserAuth } from "../../context/UserAuthContext";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component"
export default function PostList() {
  const {user} = useUserAuth();
  const [profileUser, setProfileUser] = useState({})
  let [page, setPage]= useState(1)
  const [post, setPost]= useState([])
  useEffect(() => {
    let token = user.accessToken;
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/paginate`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data:{
        paginate:page
      }
    };
    axios(Config).then(res=>{
      console.log(res)
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
  }, [page])


return (
  <InfiniteScroll 
  dataLength={post.length} 
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
        {/* {console.log(all_posts)} */}
        {post?.map((p) => {
            if(profileUser.enabled){
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
                  disable={p.disable}
                />
              )
            case "user":
              if(p.enabled && !p.disable.some(e=>e===profileUser.email))
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
                  disable={p.disable}
                />)
              
                default: return <></>
          }
            }else{
              return <div>ban</div>
            }
          })
          }
      </div>
    )}

        {/* <button onClick={handleNextPaginate}>next results</button> */}

  </div>
  </InfiniteScroll>
);
}