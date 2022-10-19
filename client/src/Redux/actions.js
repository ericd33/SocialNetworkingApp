import axios from "axios";
import {
  DETAILS_EVENT,
  GET_DETAILS,
  GET_EVENTS,
  GET_POSTS,
  SEARCH_BY_NAME,
  GET_MY_USER,
} from "./action-types.js";

export function postUser(payload,token) {
  return function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: payload.email,
        name: payload.displayName,
        image: payload.photoURL,
      },
    };
    console.log(token,Config)
    axios(Config).then(res=>{
      console.log(res)
    })
  };
}

export function getPosts(payload) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts`,
      headers: {
        authorization: `Bearer ${payload}`
      },
    };
    axios(Config).then(res =>{
      return dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    })
    
    
  };
}

export function postPost(payload, data) {
  
  return async function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts`,
      headers: {
        authorization: `Bearer ${payload}`
      },
      data: data
    };
    let json = await axios(Config)
    console.log(json);
    return json;
  };
}





export function postEvent(payload,token) {
  return function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: payload.email,
        name: payload.name,
        image: payload.image,
        hour: payload.hour,
        location: payload.location,
        content:payload.content,
        date: payload.date
      },
    };
    axios(Config).then(res=>console.log(res))
  };
}



export function details(id,token) {
  return function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events/${id}`,
      headers: {
        authorization: `Bearer ${token}`
      },
    };
    axios(Config).then(res=>{
      console.log(res)
      return dispatch({
        type: GET_DETAILS,
        payload: res.data
      })
    })
  }
}

export function deleteDetails() {
  return {
    type: DETAILS_EVENT,
  };
}

export function getMyUser(token,email) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${email}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    axios(Config).then(res =>{
      return dispatch({
        type: GET_MY_USER,
        payload: res.data,
      });
    })
    // let json = await axios.get(`http://localhost:3001/users/email/${email}`);
    // return dispatch({
    //   type: GET_MY_USER,
    //   payload: json.data,
    // });
  };
}


export function searchUsersByName(name) {
  return async function (dispatch) {
    var json = await axios.get(
      `${process.env.REACT_APP_MY_API_URL}/users?name=${name}`
    );
    console.log(json);
    return dispatch({
      type: SEARCH_BY_NAME,
      payload: json.data,
    });
  };
}
export function login(user) {
  return async function (dispatch) {
    axios
      .post(`http://localhost:3001/users/login`, user)
      .then(function (response) {
        if (response.data === true) {
          console.log(user.email);
          dispatch(getMyUser(user.email));
          window.location.href = "/home";
        } else {
          alert("This account doesnt exist!");
        }
        // console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
}

export function getEvents(payload) {
  return function (dispatch) {
    console.log(payload)
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events`,
      headers: {
        authorization: `Bearer ${payload}`
    }
  };
   axios(Config).then(res=>{
    return dispatch({
    type: GET_EVENTS,
    payload: res.data
  })
  }) 
}
}