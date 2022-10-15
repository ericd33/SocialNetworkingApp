import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import CreatePost from "../../Posts/CreatePost";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { user } = useAuth0();

  console.log(user);
  return (
    <div className="Home">
      <div className="navbar">
        <span></span>
      </div>
      <NavBar />
      <div className="media-part">
        <div className="leftHome">
          <EventsMenu />
        </div>
        <div className="centerHome">
          <PostList />
        </div>
        <div className="rightHome"></div>
      </div>
      <CreatePost />
    </div>
  );
}
