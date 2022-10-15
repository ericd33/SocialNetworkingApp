import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import PostList from "../../Posts/PostList";
import "./Home.css";
import CreatePost from "../../Posts/CreatePost";
import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { getMyID } from "../../../Redux/actions";

export default function Home() {
  const { user } = useAuth0();
  // const dispatch = useDispatch();

  // useEffect(async() => {
  //   let id = await axios.get(`http://localhost:3000/users/email/${user.email}`);
  //   console.log(id.data);
  //   dispatch(getMyID(id.data))
  // },[dispatch])

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
