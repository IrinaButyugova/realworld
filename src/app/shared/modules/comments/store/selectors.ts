import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentsStateInterface } from "../types/commentsState.interface";

export const commentsFeatureSelector = createFeatureSelector<
CommentsStateInterface
>('comments')

export const commentsSelector = createSelector(
    commentsFeatureSelector,
    (commentsState: CommentsStateInterface) => commentsState.data
)