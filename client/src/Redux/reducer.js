// Importa las action types acá

import { GET_EVENTS, GET_POSTS, GET_MY_USER, DETAILS_EVENT, GET_DETAILS, SEARCH_BY_NAME, GET_POSTS_BY_NAME} from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
  events:[],
  myUser:{},
  details:[],
  searchByNameUsers:[],
  postsUser:[],
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

      case GET_MY_USER:
        return{
          ...state,
          myUser:action.payload
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
      case SEARCH_BY_NAME:
        return{
          ...state,
          searchByNameUsers:action.payload
        }
        case GET_POSTS_BY_NAME:
        return{
          ...state,
          postsUser:action.payload
        }
    default:
      return state;
  }
};

export default rootReducer;
