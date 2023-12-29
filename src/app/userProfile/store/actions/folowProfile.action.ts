import { createAction, props } from "@ngrx/store";

import { ProfileInterface } from "../../../shared/types/profile.interface";
import { ActionTypes } from "../actionTypes";

export const followProfileAction = createAction(
    ActionTypes.FOLLOW_PROFILE,
    props<{isFollowed: boolean; username: string}>()
)

export const followProfileSuccessAction = createAction(
    ActionTypes.FOLLOW_PROFILE_SUCCESS,
    props<{profile: ProfileInterface}>()
)

export const followProfileFailureAction = createAction(
    ActionTypes.FOLLOW_PROFILE_FAILURE
)