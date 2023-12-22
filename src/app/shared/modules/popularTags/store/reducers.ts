import { Action, createReducer, on } from "@ngrx/store";
import { PopularTagsStateInterface } from "../types/popularTags.interface";
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from "./actions/getPopularTags";

const initialState: PopularTagsStateInterface = {
    data: null,
    isLoading: false,
    error: null
};

const popularTagReducer = createReducer(
    initialState,
    on(
        getPopularTagsAction, 
        (state): PopularTagsStateInterface => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getPopularTagsSuccessAction, 
        (state, action): PopularTagsStateInterface => ({
            ...state,
            isLoading: false,
            data: action.popularTags
        })
    ),
    on(
        getPopularTagsFailureAction, 
        (state): PopularTagsStateInterface => ({
            ...state,
            isLoading: false
        })
    )
);

export function popularTagReducers(state: PopularTagsStateInterface,
    action: Action){
        return popularTagReducer(state, action);
    }