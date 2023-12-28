import { Component, OnInit } from "@angular/core";
import { ArticleInputInterface } from "../../../shared/types/articleInput.interface";
import { Observable, filter, map } from "rxjs";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { articleSelector, isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { Store, select } from "@ngrx/store";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { updateArticleAction } from "../../store/actions/updateArticle.action";

@Component({
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