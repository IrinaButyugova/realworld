import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";

import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import { createArticleAction } from "../../store/actions/createArticle.action";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { ArticleFormComponent } from "../../../shared/modules/articleForm/components/articleForm/articleForm.component";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        ArticleFormComponent
    ],
    selector: 'rw-create-article',
    templateUrl: './createArticle.component.html'
})
export class CreateArticleComponent implements OnInit{
    initialValues: ArticleInputInterface = {
        title: '', 
        description: '',
        body: '',
        tagList: []
    };

    isSubmitting$!: Observable<boolean>;
    backendErrors$!: Observable<BackendErrorsInterface | null>; 

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    onSubmit(articleInput: ArticleInputInterface): void {
        this.store.dispatch(createArticleAction({articleInput}));
    }
}