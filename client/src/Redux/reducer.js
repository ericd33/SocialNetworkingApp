// Importa las action types acá

import { GET_EVENTS, GET_POSTS, GET_MY_ID } from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
  events:[],
  idUser: ''
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

      case GET_EVENTS:
        return{
          ...state,
          events: action.payload
        }
      
      case GET_MY_ID:
        return {
          ...state,
          idUser: action.payload
        }
    default:
      return state;
  }
};

export default rootReducer;
