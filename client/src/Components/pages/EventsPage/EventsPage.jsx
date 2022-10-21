import NavBar from "../../navbar/Navbar";
import NavbarEvents from "./NavbarEvents/NavbarEvents";
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
      <NavbarEvents />
      {/* <NavBar /> */}
      <div className="media-part">
        <div className="leftHome">
          
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
