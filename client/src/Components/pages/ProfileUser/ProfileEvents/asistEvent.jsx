import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAsist } from "../../../../Redux/actions";


export function AsistEvent({userInfoRen}){
    let token = window.localStorage.getItem('token').slice(1,-1)
    const dispatch = useDispatch()
    console.log(userInfoRen)
    userInfoRen.asistEvent.forEach((e)=>(
        // console.log(e)
        dispatch(getEventsAsist(token,e))
    ))
    const event = useSelector(e=>e.asistEvent)
    console.log(event)
    return(
        <div>

        </div>
    )
}