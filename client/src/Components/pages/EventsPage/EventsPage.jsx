import NavBar from "../../navbar/Navbar";
import EventsMenu from "../../Home-Components/EventsMenu";
import "./EventsPage.css";
import EventList from "../../Events/EventList";
import CreateEvent from "../../Events/CreateEvent";
import FilterEvents from "./FilterEvents";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getEvents, getEventsByName } from "../../../Redux/actions";
import NavBarMobile from "../../navbar/Navbar mobile";
import { Button, TextField } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

export default function EventsPage() {
  const {user, logOut} = useUserAuth();
    const dispatch = useDispatch()
    const userP = JSON.parse(window.localStorage.getItem("user"))
    let events = []
    events = useSelector((state)=>state.events);

    let token = user.accessToken

    useEffect(()=>{
        dispatch(getEvents(token))
    },[dispatch])

    const handleInputEvents = (e) => {
      // console.log(e.target.value);
      dispatch(getEventsByName(token, e.target.value));
    };

  let eventsSoluc = useSelector((state)=>state.soluc);

  function signOut() {
    logOut();
    localStorage.clear();
  }

  if(userP.enabled !== false) {
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
            <TextField
              variant='filled'
              placeholder="Search events..."
              id="barrabusquedaEvents"
              onChange={handleInputEvents}
            />
          <FilterEvents />
          {
          eventsSoluc.length === 0 ? 
          <EventList events={events}/> : <EventList events={eventsSoluc}/>
          }
        </div>
        <div className="rightHome"></div>
      </div>
      {
        userP.premium
          ? <CreateEvent />
          : <></>
      }
    </div>
  )}
  else {
    return (
      <div className='HomeBanned'>
        <div className="banMessage">
          <h1>Your account was banned. Contact with the staff</h1>
          <h3>concatuss@gmail.com</h3>
          <Button id='logoutBanned' variant='outlined' color="error" onClick={signOut}>
            Back
          </Button>
        </div>
      </div>
    )
  }
}
