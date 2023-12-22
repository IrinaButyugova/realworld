import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

import { PopularTagsService } from "../../services/popularTags.service";
import { getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction } from "../actions/getPopularTags";
import { PopularTagType } from "../../../../types/popularTag.type";

@Injectable()
export class GetPopularTagsEffect {
    getPopularTags$ = createEffect(() =>
    this.actions$.pipe(
        ofType(getPopularTagsAction),
        switchMap(() => {
            return this.popularTagsServce.getPopularTags().pipe(
                map((popularTags: PopularTagType[]) => {
                    return getPopularTagsSuccessAction({popularTags});
                }),
                catchError((errorResponse: HttpErrorResponse) => {
                    return of(getPopularTagsFailureAction());
                })
            )
        })
    )
    )

    constructor(private actions$: Actions, 
        private popularTagsServce: PopularTagsService){
        
    }
}