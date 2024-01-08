import { Action, createReducer, on } from "@ngrx/store";
import { CommentStateInterface } from "../types/commentState.interface";
import { createCommentAction, createCommentSuccessAction } from "./actions/createComment.action";

const initialState: CommentStateInterface ={
    isSubmitting: false,
    isLoading: false,
    data: null,
    newComment: null
}

const commentsReducer = createReducer(
    initialState,
    on(createCommentAction,
    (state): CommentStateInterface => ({
        ...state,
        isSubmitting: true
    })
    ),
    on(createCommentSuccessAction,
        (state, action): CommentStateInterface => ({
            ...state,
            isSubmitting: false,
            newComment: action.comment
        })
        ),
)

export function commentsReducers(state: CommentStateInterface, action: Action){
    return commentsReducer(state, action);
}