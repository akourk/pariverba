import { combineReducers } from "redux";
import voteReducer from "./voteReducers"

const reducers = combineReducers({
    voteCount: voteReducer
});

export default reducers;