import { createStore } from "redux";
import adminReducer from './adminReducer';

const store = createStore(adminReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;