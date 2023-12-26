import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ArticleService as SharedArticleService } from "../../../shared/services/article.service";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "../actions/getArticle.action";
import { ArticleInterface } from "../../../shared/types/article.interface";

@Injectable()
export class GetArticleEffect {
    getArticle$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getArticleAction),
        switchMap(({slug}) => {
            return this.sharedArticleService.getArticle(slug).pipe(
                map((article: ArticleInterface) => {
                    return getArticleSuccessAction({article});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getArticleFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private sharedArticleService: SharedArticleService){
        
    }
}