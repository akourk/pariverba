const initialState = 0;

interface UpvoteAction {
    type: "upvote"
    payload: number
}

interface DownvoteAction {
    type: "downvote"
    payload: number
}

interface ClearvoteAction {
    type: "clearvote"
}

type Action = UpvoteAction | DownvoteAction | ClearvoteAction

const reducer = (state: number = initialState, action: Action) => {
    switch (action.type) {
        case "upvote":
            return state + action.payload;
        case "downvote":
            return state - action.payload;
        case "clearvote":
            return 0;
        default:
            return state
    }
}

export default reducer