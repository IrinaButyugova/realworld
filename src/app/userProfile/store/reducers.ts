import { Action, createReducer, on } from "@ngrx/store";
import { UserProfileStateInterface } from "../types/userProfile.state.interface";
import { getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction } from "./actions/getUserProfile.action";

const initialState: UserProfileStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const userProfileReducer = createReducer(
    initialState,
    on(
        getUserProfileAction,
        (state): UserProfileStateInterface => ({
            ...state,
            isLoading: true,
            data: null
        })
    ),
    on(
        getUserProfileSuccessAction,
        (state, action): UserProfileStateInterface => ({
            ...state,
            isLoading: false,
            data: action.userProfile
        })
    ),
    on(
        getUserProfileFailureAction,
        (state): UserProfileStateInterface => ({
            ...state,
            isLoading: false,
            data: null
        })
    )
)

export function userProfuleReducers(state: UserProfileStateInterface, 
    action: Action){
        return userProfileReducer(state, action);
    }