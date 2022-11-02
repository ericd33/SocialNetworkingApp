// Importa las action types acá

import {
  GET_EVENTS,
  GET_POSTS,
  GET_MY_USER,
  DETAILS_EVENT,
  GET_DETAILS,
  SEARCH_BY_NAME,
  UPDATE_POSTS,
  GET_POSTS_BY_NAME,
  GET_POSTS_BY_ID,
  GET_COMMENTS_POST,
  UPDATE_COMMENT,
  GET_POSTS_FOLLOW,
  ORDER_BY_LIKE,
  ORDER_BY_COMENTS,
  GET_EVENT_PROFILE,
  EVENTS_BY_AUTHOR,
  FILTER_GLOBAL_EVENTS,
  FILTER_EVE_LOC,
  FILTER_EVE_ASSIST,
  CLEAR_EVENTS,
  FAVORITE,
  GET_OPINIONS,
  NEW_OPINION
} from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
  events: [],
  filtered_events: [],
  soluc: [],
  myUser: {},
  details: [],
  searchByNameUsers: [],
  postsUser: [],
  PostID: [],
  comments: [],
  favorite:[],
  opinions:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POSTS: {
      const postsUpdated = state.filtered_posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }

        return post;
      });

      return {
        ...state,
        posts: postsUpdated,
        filtered_posts: postsUpdated,
      };
    }
    case FAVORITE:
      return{
        ...state,
        favorite: action.payload
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        filtered_posts: action.payload,
      };

    case GET_POSTS_FOLLOW:
      // let data =action.payload
      // function validate(dataP){
      // let post = [9898]
      // for(let i = 0; i < dataP.length; i++) {
      //   if(Array.isArray(dataP[i])){
      //     for(let z = 0; z < i.length; z++) {
      //       post.push(i[z])
      //   }
      //   } else{
      //     post.push(dataP[i])
      //   }
      // }
      // return post
      // }
      // let postR= validate(data)
      return {
        ...state,
        posts: action.payload,
      };

    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        filtered_events: action.payload,
      };

    case GET_MY_USER:
      return {
        ...state,
        myUser: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case DETAILS_EVENT:
      return {
        ...state,
        details: [],
      };
    case EVENTS_BY_AUTHOR:
      return {
        ...state,
        events: action.payload,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        searchByNameUsers: action.payload,
      };
    case GET_POSTS_BY_NAME:
      return {
        ...state,
        postsUser: action.payload,
      };
    case GET_POSTS_BY_ID:
      return {
        ...state,
        PostID: action.payload,
      };
    case GET_COMMENTS_POST:
      return {
        ...state,
        comments: action.payload,
      };
    case ORDER_BY_LIKE:
      const postLikes = state.posts;
      let sorted =
        action.payload === true
          ? postLikes.sort((el1, el2) => {
              if (el1.likes.length > el2.likes.length) {
                return -1;
              }
              if (el1.likes.length < el2.likes.length) {
                return 1;
              }
              return 0;
            })
          : [];
      return {
        ...state,
        posts: sorted,
      };
    case ORDER_BY_COMENTS:
      const postComents = state.filtered_posts;
      let sortedC =
        action.payload === true
          ? postComents.sort((el1, el2) => {
              if (el1.comments.length > el2.comments.length) {
                return -1;
              }
              if (el1.comments.length < el2.comments.length) {
                return 1;
              }
              return 0;
            })
          : [];
      return {
        posts: sortedC,
      };
    case GET_EVENT_PROFILE:
      return {
        ...state,
        events: action.payload,
      };
    case FILTER_GLOBAL_EVENTS:
      const allEvents = state.filtered_events;
      const filterEvent =
        action.payload === "online"
          ? allEvents.filter((e) => e.type === "online")
          : allEvents.filter((e) => e.type === "in-person");
      return {
        ...state,
        events: action.payload === "All" ? allEvents : filterEvent,
      };
    case FILTER_EVE_LOC:
      const filterEventsLoc = state.events;
      const inPersonLoc = filterEventsLoc.filter(
        (e) => e.location === action.payload
      );
      return {
        ...state,
        events: inPersonLoc,
      };
    case FILTER_EVE_ASSIST:
      const filterEventsAssi = state.events;
      let sortedAssi =
        action.payload === "less"
          ? filterEventsAssi.sort((el1, el2) => {
              if (el1.participants.length > el2.participants.length) {
                return -1;
              }
              if (el1.participants.length < el2.participants.length) {
                return 1;
              }
              return 0;
            })
          : filterEventsAssi.sort(function (a, b) {
              if (a.participants.length > b.participants.length) {
                return 1;
              }
              if (b.participants.length > a.participants.length) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        soluc: sortedAssi,
      };
    case CLEAR_EVENTS:
      return {
        ...state,
        soluc: [],
      };

      case GET_OPINIONS:
      return {
        ...state,
        opinions: action.payload,
      };



    default:
      return state;
  }
};

export default rootReducer;
