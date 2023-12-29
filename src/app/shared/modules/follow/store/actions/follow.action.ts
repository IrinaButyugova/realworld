import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";
import { ProfileInterface } from "../../../../types/profile.interface";

export const followAction = createAction(
    ActionTypes.FOLLOW,
    props<{isFollowed: boolean; username: string}>()
)

export const followSuccessAction = createAction(
    ActionTypes.FOLLOW_SUCCESS,
    props<{profile: ProfileInterface}>()
)

export const followFailureAction = createAction(
    ActionTypes.FOLLOW_FAILURE
)