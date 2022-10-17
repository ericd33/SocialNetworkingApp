import axios from "axios";
import { DETAILS_EVENT, GET_DETAILS, GET_EVENTS, GET_POSTS, SEARCH_BY_NAME, GET_MY_USER } from './action-types.js';

export function postUser(payload) {
    return function () {
      axios.post(`${process.env.REACT_APP_MY_API_URL}/users`, payload)
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
  return async function () {
    let json = await axios.post(`${process.env.REACT_APP_MY_API_URL}/posts`, payload)
    console.log(json)
    return json
  };
}

export function postEvent(payload) {
  return async function () {
    let json = await axios.post(`http://localhost:3001/events`, payload)
    console.log(json);
    return json;
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

export function getMyUser (email){
  return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/users/email/${email}`)
    return dispatch({
      type: GET_MY_USER,
      payload:json.data
    })
    }
  }

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
export function login(user) {
  return async function(dispatch) {
    axios.post(`http://localhost:3001/users/login`, user)
    .then(function(response) {
      if (response.data === true) {
        console.log(user.email);
        dispatch(getMyUser(user.email));
        window.location.href = '/home';
      }
      else {
        alert('This account doesnt exist!');
      }
      // console.log(response);
    })
    .catch(function(err) {console.log(err)});
  }
}
