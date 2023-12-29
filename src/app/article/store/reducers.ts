import { Action, createReducer, on } from "@ngrx/store";
import { ArticleStateInterface } from "../types/articleState.interface";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "./actions/getArticle.action";
import { routerNavigationAction } from "@ngrx/router-store";
import { followProfileSuccessAction } from "./actions/folowProfile.action";

const initialState: ArticleStateInterface = {
    isLoading: false,
    error: null,
    data: null
}

const articleReducer = createReducer(
    initialState,
    on(
        getArticleAction,
        (state): ArticleStateInterface => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        getArticleSuccessAction,
        (state, action): ArticleStateInterface => ({
            ...state,
            isLoading: false,
            data: action.article
        })
    ),
    on(
        getArticleFailureAction,
        (state): ArticleStateInterface => ({
            ...state,
            isLoading: false,
            data: null
        })
    ),
    on(
        followProfileSuccessAction,
        (state, action): ArticleStateInterface => ({
            ...state,
            data: {
                ...state.data,
                author: action.profile,
                body: state.data == null ? '' : state.data.body,
                createdAt: state.data == null ? '' : state.data.createdAt,
                description: state.data == null ? '' : state.data.description,
                favorited: state.data == null ? false : state.data.favorited,
                favoritesCount: state.data == null ? 0 : state.data.favoritesCount,
                tagList: state.data == null ? [] : state.data.tagList,
                title: state.data == null ? '' : state.data.title,
                updatedAt: state.data == null ? '' : state.data.updatedAt,
                slug: state.data == null ? '' : state.data.slug
            }
        }) 
    ),
    on(
        routerNavigationAction,
        (): ArticleStateInterface => initialState
    )
)

export function articleReducers(state: ArticleStateInterface, action: Action){
    return articleReducer(state, action);
}