import React, { useContext, useEffect } from "react"
import { MapaContext } from "./contex"

export const Search=({i,place_name,center})=>{
    const {setLocation,setEventoLocation} = useContext(MapaContext)

    const handleClick = (e)=>{
        setLocation(e.target.innerHTML)
        setEventoLocation(center)
    }
    return(
        <div onClick={handleClick} key={i.toString()}>
            <p className='parrafo'>{place_name}</p>
        </div>
    )
}