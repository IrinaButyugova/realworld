import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { ArticleInterface } from "../../../shared/types/article.interface";
import { getArticleAction, getArticleFailureAction, getArticleSuccessAction } from "../actions/getArticle.action";
import { ArticleService as SharedArticleService} from "../../../shared/services/article.service";

@Injectable()
export class GetAcrticleEffect {
    getAcrticle$ = createEffect(() =>
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