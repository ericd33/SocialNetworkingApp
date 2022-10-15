import axios from "axios";
import { GET_EVENTS, GET_POSTS } from './action-types.js';

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
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/posts/');
      console.log(response);
      return dispatch({
        type: "POST_POST",
        payload: response.data,
      });
    } catch (error) {
        alert('An error ocurred');
        console.log(error);
    }
  };

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

