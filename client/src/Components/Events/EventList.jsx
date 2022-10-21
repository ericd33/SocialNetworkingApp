import EventCard from "./EventCard";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../Redux/actions";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useUserAuth } from "../../context/UserAuthContext";

export default function EventList() {
    const {user} = useUserAuth();
    const dispatch = useDispatch()
    let events = []
    events = useSelector((state)=>state.events);

    let token = user.accessToken

    useEffect(()=>{
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