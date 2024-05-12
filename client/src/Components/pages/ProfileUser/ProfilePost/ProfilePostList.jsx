import { useSelector } from "react-redux";
import Post from "../../../Posts/Post";
import EventsProfile from "../EventsProfile/EventsProfile";
import FilterEventsProfile from "../EventsProfile/FilterEventsProfile";
import './ProfilePostList.css';

const ProfilePostList = ({ render, posts, myUser }) => {
  const profileUser = useSelector(state => state.profileUser)

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
        {myUser?.liked?.map((p) => {
          return <Post
            created={p.createdAt}
            text={p.content}
            author={p.author}
            comments={p.comments}
            likes={p.likes}
            image={p.image}
            id={p._id}
            enabled={p.enabled}
          />
        })
          .reverse()}
      </div>
    );
  }
}

export default ProfilePostList;
