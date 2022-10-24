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
  ORDER_BY_COMENTS

} from "./action-types";

const initialState = {
  posts: [],
  filtered_posts: [],
  events: [],
  myUser: {},
  details: [],
  searchByNameUsers: [],
  postsUser: [],
  PostID: [],
  comments:[]
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

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        filtered_posts: action.payload,
      };

      case GET_POSTS_FOLLOW:
        // let data =action.payload
        // console.log(data)
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
        // console.log(postR)
      return {
        ...state,
        posts: action.payload,
      };

    case GET_EVENTS:
      return {
        ...state,
        events: action.payload,
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
      return{
        ...state,
        comments:action.payload
      }
      case ORDER_BY_LIKE:
        const postLikes = state.posts;
        // console.log(postLikes)
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
          : []
          console.log(sorted)
      return {
        ...state,
        posts: sorted,
      };
      case ORDER_BY_COMENTS:
        const postComents = state.filtered_posts;
        // console.log(postComents)
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
          : []
          console.log(sortedC)
        return{
          posts: sortedC
        }
    default:
      return state;
  }
};

export default rootReducer;
