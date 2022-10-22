import 'mapbox-gl/dist/mapbox-gl.css';
import {Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useContext, useEffect, useRef } from 'react';
import './map.css'
import { Marker } from 'mapbox-gl';
import { MapaContext } from './contex/MapaContext';
import { useSelector } from 'react-redux';

export default function Maps({latLon}){
    // const detail = useSelector(d=>d.details)
    console.log(latLon)
    const mapDiv = useRef(null)
    const {mapa,setMap,eventoLocation,marker} = useContext(MapaContext)
    console.log(eventoLocation)
    console.log(latLon)
    useEffect(() => {
        if(mapDiv.current){
            setMap(
                new Map({
                    container: mapDiv.current, // container ID
                    style: 'mapbox://styles/mapbox/streets-v11', // style URL
                    center: latLon, // starting position [lng, lat]
                    zoom: 9, // starting zoom
                })
                )
            }
    }, [])
    useEffect(()=>{
        mapa?.flyTo({
            center: latLon
        })
            new Marker().setLngLat(latLon).addTo(mapa)
    },[mapa])
    

    return(
        <div>
            <div className='mapa' ref={mapDiv}>
            </div>
        </div>
    )
}