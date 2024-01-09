import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable, filter, map } from "rxjs";
import { Store, select } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";

import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { updateArticleAction } from "../../store/actions/updateArticle.action";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { articleSelector, isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { ArticleFormComponent } from "../../../shared/modules/articleForm/components/articleForm/articleForm.component";
import { LoadingComponent } from "../../../shared/modules/loading/components/loading/loading.component";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        ArticleFormComponent, 
        LoadingComponent],
    selector: 'rw-edit-article',
    templateUrl: './editArticle.component.html'
})
export class EditArticleComponent implements OnInit{
    initialValues$!: Observable<ArticleInputInterface>;
    isSubmitting$!: Observable<boolean>;
    isLoading$!: Observable<boolean>;
    backendErrors$!: Observable<BackendErrorsInterface | null>; 
    slug!: string | null;

    constructor(private store: Store, private route: ActivatedRoute){

    }

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    fetchData() {
        if(this.slug != null){
            this.store.dispatch(getArticleAction({slug: this.slug}));
        }
    }

    initializeValues() {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
        this.initialValues$ = this.store.pipe(
            select(articleSelector),
            filter(Boolean),
            map((article: ArticleInterface) => {
                return {
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList: article.tagList
                }
            })
        );
    }

    onSubmit(articleInput: ArticleInputInterface): void {
        if(this.slug != null){
            this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
        }
        
    }
}