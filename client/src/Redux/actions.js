import { async } from "@firebase/util";
import axios from "axios";
import {
  DETAILS_EVENT,
  GET_DETAILS,
  GET_EVENTS,
  GET_POSTS,
  SEARCH_BY_NAME,
  GET_MY_USER,
  GET_POSTS_BY_NAME,
  GET_POSTS_BY_ID,
  NEW_COMMENT,
  GET_COMMENTS_POST,
  GET_POSTS_FOLLOW,
} from "./action-types.js";

export function postUser(payload, token) {
  return function () {
    console.log(payload)
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: payload.email,
        name: payload.name,
        image: payload.image,
      },
    };
    axios(Config).then((res) => {
      console.log(res);
    }).catch(err => console.log(err))
  };
}

export function getPosts(payload) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts`,
      headers: {
        authorization: `Bearer ${payload}`,
      },
    };
    axios(Config).then((res) => {
      return dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    });
  };
}

export function postPost(token, data) {
  return async function (dispatch) {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: data,
    };
    await axios(Config);
    dispatch(getPosts(token));
  };
}

export function Donate(token, data) {
  return async function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/mercado`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        donacion: data
      }
    };
    await axios(Config).then((res) => console.log(res))
  };
}

export function postEvent(payload, token) {
  return async function (dispatch) {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: payload.email,
        name: payload.name,
        username: payload.username,
        image: payload.image,
        location: payload.location,
        content: payload.content,
        date: payload.date,
        lat_log:payload.lat_log
      },
    };
    await axios(Config);
    dispatch(getEvents(token));
  };
}

export function details(id, token) {
  return function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      console.log(res);
      return dispatch({
        type: GET_DETAILS,
        payload: res.data,
      });
    });
  };
}

export function deleteDetails() {
  return {
    type: DETAILS_EVENT,
  };
}

export function getMyUser(token, email) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/email/${email}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      // console.log(res);
      return dispatch({
        type: GET_MY_USER,
        payload: res.data,
      });
    });
    // let json = await axios.get(`http://localhost:3001/users/email/${email}`);
    // return dispatch({
    //   type: GET_MY_USER,
    //   payload: json.data,
    // });
  };
}

export function searchUsersByName(name, token) {
  return function (dispatch) {
    if (name === "") {
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: [],
      });
    }
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users?name=${name}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      // console.log(res)
      return dispatch({
        type: SEARCH_BY_NAME,
        payload: res.data,
      });
    });
  };
}

export function login(user) {
  return async function (dispatch) {
    axios
      .post(`http://localhost:3001/users/login`, user)
      .then(function (response) {
        if (response.data === true) {
          // console.log(user.email);
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
    // console.log(payload);
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events`,
      headers: {
        authorization: `Bearer ${payload}`,
      },
    };
    axios(Config).then((res) => {
      return dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    });
  };
}

export function putLikes(idPost, email, token) {
  return async function (dispatch) {
    const Config = {
      method: "put",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/${idPost}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        email: email,
      },
    };
    // console.log(token,Config)
    const { data } = await axios(Config);

    dispatch({
      type: "UPDATE_POSTS",
      payload: data.data,
    });
  };
}

export function updateComment(postId, userId, commentData, token) {
  return async function (dispatch) {
    const requestConfig = {
      method: "put",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/${postId}/comment`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        commentData,
      },
    };

    await axios(requestConfig);

    dispatch({
      type: "UPDATE_COMMENT",
    });

    dispatch(getPosts(token));
  };
}

/* 
export function updateComment(text, image, idUser, idPost, token) {
  return async function (dispatch) {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/comments/new`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        image,
        text: text,
        idUser,
        idPost,
      },
    };
    const { data } = await axios(Config);

    dispatch({
      type: "UPDATE_COMMENT",
      payload: data,
    });
  };
} */

export function getPostsByName(token, id) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/post/${id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      return dispatch({
        type: GET_POSTS_BY_NAME,
        payload: res.data,
      });
    });
  };
}

export function follows(payload, token) {
  return function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/follow`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        emailFollowed: payload.emailFollowed,
        emailFollow: payload.emailFollow,
      },
    };
    axios(Config).then((res) => console.log(res));
  };
}

export function getPostId(token, idPost) {
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/${idPost}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      return dispatch({
        type: GET_POSTS_BY_ID,
        payload: res.data,
      });
    });
  };
}

export function assitEvent(token,payload){
  return function () {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/users/event`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        eventId: payload.eventId,
        userEmail: payload.userEmail
      },
    };
    axios(Config).then(res=>console.log(res))
  };
}


export function getEventsByName(token, name) {
  return function (dispatch) {
    // console.log(payload);
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/events?name=${name}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      // console.log(res);
      return dispatch({
        type: GET_EVENTS,
        payload: res.data,
      });
    });
  };
}

export function getCommentsPost(token, payload) {
  return function (dispatch) {
    console.log(payload);
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/comments/${payload}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      console.log(res);
      return dispatch({
        type: GET_COMMENTS_POST,
        payload: res.data
      });
    });
}
}

export function newComment(token,payload){
  console.log(payload)
  return async function(dispatch){
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/comments/new`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: {
        authorComment: payload.authorComment,
        idPost:payload.idPost,
        text: payload.text,
        image:payload.image
      }
    };
    await axios(Config).then((res)=>{
      return dispatch({
        type: NEW_COMMENT,
        payload: res.data,
      });
    })
  }
}


const validate =(data)=>{
for (let i = 0; i < data.length; i++) {
  if(typeof i === 'object'){
    for (let z = 0; z < i.length; z++) {
      x.push(data[z])
    }
  } else{
    x.push(data[i])
  }
}
}

const clear = ()=>{
  setTimeout(()=>{
    x=[]
  },3000)
}

let x = [];

export function getPostsFollows(token,email) {
  // let x = []
  return async function (dispatch) {
    const Config = {
      method: "get",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts/email/${email}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios(Config).then((res) => {
      validate(res.data)
      setTimeout(()=>{
        clear()
        return dispatch({
        type: GET_POSTS_FOLLOW,
        payload: x,
      })
      },1000)
      })

  };
}
