import { LngLatBounds, Marker,AnySourceData } from "mapbox-gl"
import React, { useContext } from "react"
import { useMemo } from "react"
import { searchRoute } from "./axios/routeSearch"
import { MapaContext } from "./contex"

export const SearchResults =({i,text,place_name,center})=>{
    const {mapa, setResults, setLocation,marker,myUbication} = useContext(MapaContext)
    const routeId = useMemo(()=>"routeId",[])
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
            setResults(false)
            setLocation("")
            //creo marcador a lugar de busqueda y asigno una referencia
            marker.current=new Marker()
            //asigno ubicacion del marcador
            marker.current.setLngLat(center).addTo(mapa)
            //vuelo a la ubicacion del marcador
            // mapa.flyTo(center)
            //traza de ruta
            const route=`/${myUbication.join(",")};${center.join(",")}`
            const {data} = await searchRoute.get(route)
            console.log(data)
            const bounds = new LngLatBounds(myUbication,center)
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
        <div onClick={handleMark} key={i.toString()}>
            <p className='parrafo'>{text}</p>
            <p className='parrafo'>{place_name}</p>
        </div>
    )
}