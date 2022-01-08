import { ActionType } from "../action-types"
import { Dispatch } from "redux"

export const upvote = (amount: number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPVOTE,
            payload: amount
        })
    }
}

export const downvote = (amount: number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPVOTE,
            payload: amount
        })
    }
}

export const clearvote = (amount: number) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ActionType.UPVOTE,
            payload: amount
        })
    }
}