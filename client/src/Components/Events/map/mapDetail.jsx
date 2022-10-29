import 'mapbox-gl/dist/mapbox-gl.css';
import {LngLatBounds, Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useContext, useEffect, useMemo, useRef } from 'react';
import './map.css'
import { Marker } from 'mapbox-gl';
import { MapaContext } from './contex/MapaContext';
import {searchRoute} from "./axios/routeSearch"
import { Button } from '@mui/material';
import { grey } from '@mui/material/colors';



export default function Maps({latLon}){
    // const detail = useSelector(d=>d.details)
    const mapDiv = useRef(null)
    const {mapa,setMap,marker,myUbication, setMyUbication} = useContext(MapaContext)
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
    const routeId = useMemo(()=>"routeId",[])
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords})=>{
            setMyUbication([coords.longitude,coords.latitude])
            }
        )
    },[])
    const handleMark =async ()=>{
        if(mapa){
            if(!mapa){
                return
            }
            //si existe un marcador lo elimino 
            if(marker.current){
                marker.current.remove()
            }
            //limpiar buscador
            //creo marcador a lugar de busqueda y asigno una referencia
            marker.current=new Marker()
            //asigno ubicacion del marcador
            marker.current.setLngLat(myUbication).addTo(mapa)
            //vuelo a la ubicacion del marcador
            // mapa.flyTo(center)
            //traza de ruta
            const route=`/${latLon.join(",")};${myUbication.join(",")}`
            const {data} = await searchRoute.get(route)
            const bounds = new LngLatBounds(myUbication,latLon)
            const {coordinates} = data.routes[0].geometry
            for(const coord of coordinates){
                bounds.extend(coord)
            }
            //acomoda el mapa para que se vean los dos puntos
            mapa.fitBounds(bounds,{padding:200})

            let sourceData = {
                type:"geojson",
                data:{
                    type:"FeatureCollection",
                    features:[
                        {
                            type:"Feature",
                            properties:{},
                            geometry:{
                                type:"LineString",
                                coordinates,
                            }
                        }
                    ]
                }
            } 
            if(mapa.getLayer(routeId)){
                mapa.removeLayer(routeId)
                mapa.removeSource(routeId)
            }
            
            mapa.addSource(routeId,sourceData)

            mapa.addLayer({
                id:routeId,
                type:"line",
                source:routeId,
                layout:{
                    "line-cap":"round",
                    "line-join":"round",
                },
                paint:{
                    "line-color":"#3b82f6",
                    "line-width":3
                }
            })
        }
    }

    return(
        <div className='divMapa'>
            <Button onClick={handleMark} id='assistButton' sx={{bgcolor: 'secondary.main', color:grey[900], fontSize:11}} variant="contained">
                How to get
            </Button>
            <div className='mapa' ref={mapDiv}>
            </div>
        </div>
    )
}