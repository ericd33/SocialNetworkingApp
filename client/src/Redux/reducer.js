// Importa las action types acá

import { GET_MY_ID, DETAILS_EVENT, GET_DETAILS, GET_EVENTS, GET_POSTS, GET_USER_FOR_ID } from "./action-types";


const initialState = {
  posts: [],
  filtered_posts: [],
  events:[],
  idUser: '',
  details:[],
  findUserId:[],
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
      
      case GET_MY_ID:
        return {
          ...state,
          idUser: action.payload
        }

      case GET_DETAILS:
        return{
          ...state,
          details:action.payload
        }
      case DETAILS_EVENT:
        return{
            ...state,
            details:[]     
        }
      case GET_USER_FOR_ID:
        return{
          ...state,
          findUserId:action.payload
        }

    default:
      return state;
  }
};

export default rootReducer;
