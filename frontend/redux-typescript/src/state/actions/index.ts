import { ActionType } from "../action-types"

interface UpvoteAction {
    type: ActionType.UPVOTE
    payload: number
}

interface DownvoteAction {
    type: ActionType.DOWNVOTE
    payload: number
}

interface ClearvoteAction {
    type: ActionType.CLEARVOTE
}

export type Action = UpvoteAction | DownvoteAction | ClearvoteAction