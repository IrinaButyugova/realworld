import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { CommentInputInterface } from "../../types/commentInput.interface";
import { CommentInterface } from "../../types/comment.interface";

export const createCommentAction = createAction(
    ActionTypes.CREATE_COMMENT,
    props<{slug: string, commentInput: CommentInputInterface}>()
)

export const createCommentSuccessAction = createAction(
    ActionTypes.CREATE_COMMENT_SUCCESS,
    props<{comment: CommentInterface}>()
)

export const createCommentFailureAction = createAction(
    ActionTypes.CREATE_COMMENT_FAILURE
)
