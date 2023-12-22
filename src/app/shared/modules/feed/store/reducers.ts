import { Action, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { getFeedAction, getFeedFailureAction, getFeedSuccessAction } from "./actions/getFeed.action";
import { routerNavigatedAction } from "@ngrx/router-store";

const initialState: FeedStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const feedReducer = createReducer(
    initialState,
    on(
        getFeedAction,
        (state): FeedStateInterface => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getFeedSuccessAction,
        (state, action): FeedStateInterface => ({
            ...state,
            isLoading: false,
            data: action.feed
        })
    ),
    on(
        getFeedFailureAction,
        (state): FeedStateInterface => ({
            ...state,
            isLoading: false,
            data: null
        })
    ),
    on(
        routerNavigatedAction,
        (): FeedStateInterface => initialState
    )
)

export function feedReducers(state: FeedStateInterface, action: Action){
    return feedReducer(state, action);
}