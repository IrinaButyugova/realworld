import { createFeatureSelector, createSelector } from "@ngrx/store"
import { UserProfileStateInterface } from "../types/userProfile.state.interface"

export const userProfileFeatureSelector = createFeatureSelector<
UserProfileStateInterface
>('userProfile')

export const isLoadingSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
)

export const errorSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.error
)

export const userProfileSelector = createSelector(
    userProfileFeatureSelector,
    (userProfileState: UserProfileStateInterface) => userProfileState.data
)