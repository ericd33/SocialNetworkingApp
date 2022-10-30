import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import "./EventsPage.css";
import EventList from "../../Events/EventList";
import CreateEvent from "../../Events/CreateEvent";
import FilterEvents from "./FilterEvents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getEvents } from "../../../Redux/actions";
import NavBarMobile from "../../navbar/Navbar mobile";

export default function EventsPage() {
  const {user} = useUserAuth();
    const dispatch = useDispatch()
    let events = []
    events = useSelector((state)=>state.events);

    let token = user.accessToken

    useEffect(()=>{
        dispatch(getEvents(token))
    },[dispatch])
  
  let eventsSoluc = useSelector((state)=>state.soluc);

  return (
    <div className="HomeEvents">
      <div className="navbarEvents">
        <NavBar />
        <span></span>
      </div>
      <div className="navbarMobileEvents">
        <NavBarMobile />
        <span></span>
      </div>
      <div className="media-part">
        <div className="leftHome">
          <EventsMenu />
        </div>
        <div className="centerHome">
          <FilterEvents />
          {
          eventsSoluc.length === 0 ? 
          <EventList events={events}/> : <EventList events={eventsSoluc}/>
          }
        </div>
        <div className="rightHome"></div>
      </div>
      <CreateEvent />
    </div>
  );
}
