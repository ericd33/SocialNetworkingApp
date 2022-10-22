import { createContext, useRef, useState } from "react";





export const MapaContext = createContext({})


export const  MapaProvider = ({children})=>{
    const [mapa, setMap] = useState()
    const [ results, setResults ] = useState(false)
    const [location, setLocation] = useState()
    const marker = useRef()
    const [myUbication,setMyUbication] = useState([34,58])
    const [eventoLocation,setEventoLocation] = useState([])
    console.log(eventoLocation)
    return<MapaContext.Provider value={{eventoLocation,setEventoLocation,mapa,setMap,results,setResults,location,setLocation,marker,myUbication,setMyUbication}}>
        {children}
    </MapaContext.Provider>
} 