import { Action, createReducer, on } from "@ngrx/store";
import { CommentsStateInterface } from "../types/commentsState.interface";
import { createCommentAction, createCommentSuccessAction } from "./actions/createComment.action";
import { getCommentsAction, getCommentsSuccessAction } from "./actions/getComments.action";
import { deleteCommentAction, deleteCommentSuccessAction } from "./actions/deleteAction.action";

const initialState: CommentsStateInterface ={
    isSubmitting: false,
    isLoading: false,
    data: [],
}

const commentsReducer = createReducer(
    initialState,
    on(createCommentAction,
        (state): CommentsStateInterface => ({
            ...state,
            isSubmitting: true
    })
    ),
    on(createCommentSuccessAction,
        (state, action): CommentsStateInterface => ({
            ...state,
            isSubmitting: false,
            data: [...state.data, action.comment]
        })
    ),
    on(getCommentsAction,
        (state, action): CommentsStateInterface => ({
            ...state,
            isLoading: true,
            data: []
        })
    ),
    on(getCommentsSuccessAction,
        (state, action): CommentsStateInterface => ({
            ...state,
            isLoading: false,
            data: action.comments
        })
    ),
    on(deleteCommentAction,
        (state): CommentsStateInterface => ({
            ...state,
            isSubmitting: true
    })
    ),
    on(deleteCommentSuccessAction,
        (state, action): CommentsStateInterface => ({
            ...state,
            isSubmitting: false,
            data: state.data.filter(x => x.id !== action.id)
        })
    ),
)

export function commentsReducers(state: CommentsStateInterface, action: Action){
    return commentsReducer(state, action);
}