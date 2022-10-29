import EventCard from "../../../Events/EventCard";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEventsByAuthor } from "../../../../Redux/actions";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useUserAuth } from "../../../../context/UserAuthContext";
import { useParams } from 'react-router-dom';

const EventsProfile = () => {
const {user} = useUserAuth();
const dispatch = useDispatch()
let query = useParams();
let author = query.email
let token = user.accessToken
let eventsProfile = useSelector((state)=> state.events)

useEffect(()=>{
	dispatch(getEventsByAuthor(token,author))
},[dispatch])


if (eventsProfile.length === 0) {
    return (
        <div className='List'>
            <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
            </div>
        </div>
    )
}
else {
    return (
        <div className="List">
            {
                eventsProfile?.map(e=>{
                    return (
                        <EventCard
                            key={e.author+e.date} 
                            date={e.date}
                            location={e.location}
                            name={e.name}
                            text={e.content}
                            image={e.image}
                            id={e._id}
                        />
                    )
                }).reverse()
            }
        </div>
    )
}
}

export default EventsProfile