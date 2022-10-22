import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import "./EventsPage.css";
import EventList from "../../Events/EventList";
import CreateEvent from "../../Events/CreateEvent";

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
          <EventList />
        </div>
        <div className="rightHome"></div>
      </div>
      <CreateEvent />
    </div>
  );
}
