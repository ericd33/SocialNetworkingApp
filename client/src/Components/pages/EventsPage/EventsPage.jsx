import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import "./EventsPage.css";
import EventList from "../../Events/EventList";
import CreateEvent from "../../Events/CreateEvent";
import FilterEvents from "./FilterEvents";

export default function EventsPage() {

  return (
    <div className="Home">
      <div className="navbar">
        <span></span>
      </div>
      <NavBar/>
      <div className="media-part">
        <div className="leftHome">
          <EventsMenu />
        </div>
        <div className="centerHome">
          <FilterEvents />
          <EventList />
        </div>
        <div className="rightHome"></div>
      </div>
      <CreateEvent />
    </div>
  );
}
