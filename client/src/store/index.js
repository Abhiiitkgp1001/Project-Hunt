import { applyMiddleware,createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import GetUserAuthentication from "../api/get/get_user_authentication";


const userReducer = (state = {login : false,token:null, profileCompleted:false}, action) => {
    if(action.type === "Login"){
        console.log(action.token);
        return {
          login: true,
          token: action.token,
          profileCompleted: false
        };
    }
    
    if (action.type === "Logout") {
      return {
        login: false,
        token: null,
        profileCompleted: false
      };
    }
    if (action.type === "CompleteProfile") {
      console.log("entered");
      return {
        login: state.login,
        token: state.token,
        profileCompleted: action.profileCompleted,
      };
    }
    return state; 
}
const store = createStore(userReducer, applyMiddleware(thunkMiddleware));

export default store;