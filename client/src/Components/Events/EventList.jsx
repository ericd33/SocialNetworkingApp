import PostEvent from "./PostEvent";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../Redux/actions";

export default function EventList() {
    const events = useSelector(e=>e.events)

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getEvents())
    },[getEvents])

    return (
        <Container>
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
                        />
                    )
                })
            }
            <br/>
        </Container>
    )
}