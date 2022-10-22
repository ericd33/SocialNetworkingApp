import axios from "axios";
import { mapboxAccessToken } from "../constMap";


export const searchPlaces = axios.create({
    baseURL:"https://api.mapbox.com/geocoding/v5/mapbox.places/",
    params:{
      proximity:"ip",
      types:"place,postcode,address",
      access_token:mapboxAccessToken
    }
  })