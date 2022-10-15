// Importa las action types acá

import { GET_EVENTS, GET_POSTS } from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
  events:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        filtered_posts: action.payload
      }
      case GET_EVENTS:
        return{
          ...state,
          events: action.payload
        }
    default:
      return state;
  }
};

export default rootReducer;
