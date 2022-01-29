import { ActionType } from "../action-types"
import { Dispatch } from "redux"
import { Action } from "../actions/index"

export const upvote = (amount: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPVOTE,
            payload: amount
        })
    }
}

export const downvote = (amount: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DOWNVOTE,
            payload: amount
        })
    }
}

export const clearvote = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CLEARVOTE
        })
    }
}