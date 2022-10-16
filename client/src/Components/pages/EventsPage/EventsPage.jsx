import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import "./EventsPage.css";
import CreatePost from "../../Posts/CreatePost";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyID } from "../../../Redux/actions";
import EventList from "../../Events/EventList";

export default function EventsPage() {

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
          <EventList />
        </div>
        <div className="rightHome"></div>
      </div>
      <CreatePost />
    </div>
  );
}
