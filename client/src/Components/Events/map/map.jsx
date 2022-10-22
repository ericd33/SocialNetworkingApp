import 'mapbox-gl/dist/mapbox-gl.css';
import {Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import './map.css'
import { Marker } from 'mapbox-gl';
import { searchPlaces } from './axios/searchPlaces';
import { SearchResults } from './SearchResults';
import { MapaContext } from './contex/MapaContext';

export default function Maps(){
    const mapDiv = useRef(null)
    const {myUbication,setMyUbication,mapa, setMap,results,setResults,location,setLocation} = useContext(MapaContext)
    const [locations,setLocations] = useState([{
        center:"",
        place_name:"",
        text:""
    }])
    const [error, setError] = useState()
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords})=>{
            setMyUbication([coords.longitude,coords.latitude])
            },
        ()=>{
            setError("no se pudo acceder a la ubicacion")
        }
        )
    },[])

    useEffect(()=>{
        mapa?.flyTo({
            center: myUbication
        })
        if(mapa){
            new Marker({color: "fa6b6b"}).setLngLat(myUbication).addTo(mapa)
        }
    },[myUbication])

    const handleClick = ()=>{
        mapa?.flyTo({center: myUbication})
    }

    

    useEffect(() => {
        if(mapDiv.current){
            setMap(
            new Map({
                container: mapDiv.current, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: myUbication, // starting position [lng, lat]
                zoom: 9, // starting zoom
            })
        )
        }
    }, [mapDiv])
    
    
    const timeOutRef=useRef()

    async function search() {
        if(timeOutRef.current){
            clearInterval(timeOutRef.current)
        }
        if(!location) return
        timeOutRef.current = setTimeout(async ()=>{
            const {data} = await searchPlaces.get(`${location}.json`)
            setLocations(data.features)
            setResults(data.features.length>0)
            console.log(locations)
            console.log(data)
        },500)
    }
    if(error){
        return <div>
            <p className='error'>{error}</p>
        </div>
    }
    return(
        <div>
                <input type="search" 
            placeholder='search' 
            className='search' 
            onKeyUp={search}
            value={location}
            onChange={({target})=>setLocation(target.value)}
                />
            <div className='div'>
            <div>
                {
                    locations.length && results
                    ? locations.map(({place_name,text, center},i)=><SearchResults place_name={place_name} text={text} center={center} i={i}/>)
                    : location && results &&(
                        <div>
                            <p className='parrafo'>No encontrado</p>
                            <p className='parrafo'>{location}</p>
                        </div>
                    )
                }
            </div>
            </div>
            
            <button className='setlocation' onClick={handleClick}>Set location</button>
            <div className='mapa' ref={mapDiv}>
            </div>
        </div>
    )
}