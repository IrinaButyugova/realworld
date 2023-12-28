import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { EditArticleService } from "../../services/editArticle.service";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { updateArticleAction, updateArticleFailureAction, updateArticleSuccessAction } from "../actions/updateArticle.action";

@Injectable()
export class UpdateAcrticleEffect {
    updateAcrticle$ = createEffect(() =>
    this.actions$.pipe(
        ofType(updateArticleAction),
        switchMap(({slug, articleInput}) => {
            return this.editArticleService.updateArticle(slug, articleInput).pipe(
                map((article: ArticleInterface) => {
                    return updateArticleSuccessAction({article});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    const backendErrors : BackendErrorsInterface = { 
                      'error': [errorResponse.error]
                    };
                    return of(updateArticleFailureAction({errors: backendErrors}
                    ));
                })
            )
        })
    )
    )

    redirectAfterSubmit$ = createEffect(
        () =>
        this.actions$.pipe(
            ofType(updateArticleSuccessAction),
            tap(({article}) => {
                this.router.navigate(['/articles', article.slug])
            })
        ),
        {
            dispatch: false
        }
    )

    constructor(private actions$: Actions, 
        private editArticleService: EditArticleService,
        private router: Router){
        
    }
}
