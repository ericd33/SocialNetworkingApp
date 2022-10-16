import PostEvent from "./PostEvent";
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
    },[getEvents,dispatch])

    return (
        <Container>
            <Link to={"/"}><button>Home</button></Link>
            {
                events?.map(e=>{
                    return (
                        <PostEvent
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