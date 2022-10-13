// Importa las action types acá
import { CREATE_USER } from "./actions";

const initialState = {
  x: [],
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return{
        ...state
      }
    default:
      return state;
  }
};

export default rootReducer;
