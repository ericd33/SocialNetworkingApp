import axios from "axios";
import { mapboxAccessToken } from "../constMap";

// https://api.mapbox.com/directions/v5/mapbox/driving/
//-74.139988,40.810709;-74.270488,40.730083

export const searchRoute = axios.create({
    baseURL:"https://api.mapbox.com/directions/v5/mapbox/driving",
    params:{
        geometries:'geojson',
        language:'es',
        overview:'simplified',
        steps:false,
        alternatives:false,
        access_token:mapboxAccessToken,
    }
})

