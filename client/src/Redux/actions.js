import axios from "axios";
import { DETAILS_EVENT, GET_DETAILS, GET_EVENTS, GET_POSTS, GET_USER_FOR_ID, GET_MY_ID, SEARCH_BY_NAME } from './action-types.js';

export function postUser(payload) {
    return function () {
      axios.post(`${process.env.REACT_APP_MY_API_URL}/user`, payload)
      .then(function(response) {console.log(response)})
      .catch(function(err) {console.log(err)});
    };
  }

export function getPosts() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_MY_API_URL}/posts`)
    .then((posts) => {
      dispatch({
        type: GET_POSTS,
        payload: posts.data
      })
    })
    .catch(function(err) {console.log(err)});
  }
}

export function postPost(payload) {
  return function () {
    axios.post(`${process.env.REACT_APP_MY_API_URL}/posts`, payload)
    .then(function(response) {console.log(response)})
    .catch(function(err) {alert('An error ocurred')});
  };
}


export function getEvents() {
  return async function(dispatch) {
    let json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/events`)
    console.log(json)
    return dispatch({
      type : GET_EVENTS,
      payload: json.data
    }) 
  }
}

export function getMyID(data) {
  return function(dispatch) {
    dispatch({
      type: GET_MY_ID,
      payload: data
    })
  }
}

export function details(id){
  return async function(dispatch){
      var json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/events/${id}`)
      return dispatch({
          type: GET_DETAILS,
          payload:json.data
      })
  }
}

export function deleteDetails(){
  return{
      type: DETAILS_EVENT
  }
}

export default function getUser(id){
  return async function(dispatch){
    var json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/users/${id}`)
    return dispatch({
        type: GET_USER_FOR_ID,
        payload:json.data
    })
}}

export function searchUsersByName(name){
  return async function(dispatch){
    var json = await axios.get(`${process.env.REACT_APP_MY_API_URL}/users?name=${name}`)
    console.log(json)
    return dispatch({
        type: SEARCH_BY_NAME,
        payload:json.data
    })
}
}
