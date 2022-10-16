import EventCard from "./EventCard";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../Redux/actions";
import { Link } from "react-router-dom";

export default function EventList() {
    const events = useSelector(e=>e.events)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getEvents())
    },[dispatch])

    return (
        <Container>
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
            <br/>
        </Container>
    )
}