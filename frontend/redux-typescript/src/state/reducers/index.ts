import { combineReducers } from "redux";
import voteReducer from "./voteReducers"

const reducers = combineReducers({
    voteCount: voteReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>