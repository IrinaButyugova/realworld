import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { CreateArticleService } from "../../services/createArticle.service";
import { createArticleAction, createArticleFailureAction, createArticleSuccessAction } from "../actions/createArticle.action";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";

@Injectable()
export class CreateAcrticleEffect {
    createAcrticle$ = createEffect(() =>
    this.actions$.pipe(
        ofType(createArticleAction),
        switchMap(({articleInput}) => {
            return this.createArticleService.createArticle(articleInput).pipe(
                map((article: ArticleInterface) => {
                    return createArticleSuccessAction({article});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    const backendErrors : BackendErrorsInterface = { 
                      'error': [errorResponse.error]
                    };
                    return of(createArticleFailureAction({errors: backendErrors}
                    ));
                })
            )
        })
    )
    )

    redirectAfterSubmit$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(createArticleSuccessAction),
            tap(({article}) => {
                this.router.navigate(['/articles', article.slug])
            })
        ),
        {
            dispatch: false
        }
    )

    constructor(private actions$: Actions, 
        private createArticleService: CreateArticleService,
        private router: Router){
        
    }
}
