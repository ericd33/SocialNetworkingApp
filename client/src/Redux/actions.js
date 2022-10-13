import axios from "axios";

export const CREATE_USER = "CREATE_USER";

export function postUser(payload) {
    return async function (dispatch) {
      const post = await axios.post(
        "http://localhost:3001/user",
        payload
      );
      return dispatch({
        type: CREATE_USER,
        payload: post,
      });
    };
  }

