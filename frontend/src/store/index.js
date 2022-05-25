// Main Function where our Global State is created and every Reducer is imported here and passed to middleware to create the state
import {createStore,combineReducers,applyMiddleware} from "redux";
import storage from 'redux-persist/lib/storage'
// Thunk Middleware is used to handle async fetching call e.g., fetching the data from localhost:5000 
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import {PostReducer,FetchPosts,FetchPost,updatePost,UpdateImage} from "./reducers/PostReducer";
// devTools for viewing our states in dev tools extensions 
import { composeWithDevTools } from 'redux-devtools-extension';
import {updateName} from "./reducers/ProfileReducer"
// function to combine multiple reducers
const rootReducers = combineReducers({
    AuthReducer,PostReducer,FetchPosts,FetchPost,updatePost,UpdateImage,updateName
});
const persistConfig = {
  key: 'root',
  storage,
}
const middlewares = [thunkMiddleware];
// crreating main Store which will be exported
const Store = createStore(rootReducers,composeWithDevTools(applyMiddleware(...middlewares)));
console.log(Store.getState());
export default Store;