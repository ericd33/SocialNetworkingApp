// Importa las action types acá

import { GET_POSTS } from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        filtered_posts: action.payload
      }
      // case 'POST_POST':
      //   return {
      //     ...state,
      //   }
    default:
      return state;
  }
};

export default rootReducer;
