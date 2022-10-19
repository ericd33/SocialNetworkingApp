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
} from "./action-types.js";

export function postUser(payload, token) {
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
    console.log(token, Config);
    axios(Config).then((res) => {
      console.log(res);
    });
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

export function postPost(payload, data) {
  return async function (dispatch) {
    const Config = {
      method: "post",
      baseURL: `${process.env.REACT_APP_MY_API_URL}/posts`,
      headers: {
        authorization: `Bearer ${payload}`,
      },
      data: data,
    };
    await axios(Config);
    dispatch(getPosts(payload));
  };
}

export function postEvent(payload, token) {
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
        location: payload.location,
        content: payload.content,
        date: payload.date,
      },
    };
    axios(Config).then((res) => console.log(res));
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
      console.log(res);
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
    console.log(payload);
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
