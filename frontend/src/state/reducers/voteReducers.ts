import { ActionType } from "../action-types";
import { Action } from "../actions/index"

const initialState = 0;

const reducer = (state: number = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.UPVOTE:
            return state + action.payload;
        case ActionType.DOWNVOTE:
            return state - action.payload;
        case ActionType.CLEARVOTE:
            return 0;
        default:
            return state
    }
}

export default reducer