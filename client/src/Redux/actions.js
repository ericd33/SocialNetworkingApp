import axios from "axios";
import { GET_POSTS } from './action-types.js';

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

