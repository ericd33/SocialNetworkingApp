import EventCard from "./EventCard";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function EventList() {
    let events = [];
    events = useSelector(e=>e.events);

    const dispatch = useDispatch()
    useEffect(()=>{
        const token = getAuth().currentUser.accessToken
        dispatch(getEvents(token))
    },[dispatch])

    if (events.length === 0) {
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
                    events?.map(e=>{
                        return (
                            <EventCard
                                key={e.author+e.date} 
                                date={e.date}
                                hour={e.hour}
                                location={e.location}
                                title={e.title}
                                text={e.content}
                                image={e.image}
                                id={e._id}
                            />
                        )
                    })
                }
            </div>
        )
    }
}