import axios from "axios";
import { DETAILS_EVENT, GET_DETAILS, GET_EVENTS, GET_POSTS, GET_USER_FOR_ID, GET_MY_ID, SEARCH_BY_NAME } from './action-types.js';

export function postUser(payload) {
    return function () {
      axios.post("http://localhost:3001/user", payload)
      .then(function(response) {console.log(response)})
      .catch(function(err) {console.log(err)});
    };
  }

export function getPosts() {
  return function(dispatch) {
    axios.get('http://localhost:3001/posts')
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
    axios.post("http://localhost:3001/posts", payload)
    .then(function(response) {console.log(response)})
    .catch(function(err) {alert('An error ocurred')});
  };
}


export function getEvents() {
  return async function(dispatch) {
    let json = await axios.get('http://localhost:3001/events')
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
      var json = await axios.get(`http://localhost:3001/events/${id}`)
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
    var json = await axios.get(`http://localhost:3001/users/${id}`)
    return dispatch({
        type: GET_USER_FOR_ID,
        payload:json.data
    })
}}

export function searchUsersByName(name){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/users?name=${name}`)
    console.log(json)
    return dispatch({
        type: SEARCH_BY_NAME,
        payload:json.data
    })
}
}
