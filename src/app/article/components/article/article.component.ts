import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { Observable, Subscription, combineLatest, map } from "rxjs";
import { articleSelector, errorSelector, isLoadingSelector } from "../../store/selectors";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";


@Component({
    selector: 'rw-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{
    slug!: string | null;
    article!: ArticleInterface | null;
    articleSubscription!: Subscription;
    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;
    isAuthor$!: Observable<boolean>;

    constructor(private store: Store, private route: ActivatedRoute){
        
    }

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
        this.fetchData();
    }

    fetchData() {
        if(this.slug !== null){
            this.store.dispatch(getArticleAction({slug: this.slug}))
        }
    }

    initializeListeners() {
        this.articleSubscription = this.store
        .pipe(select(articleSelector))
        .subscribe((article: ArticleInterface | null) => {
            this.article = article
        });
    }

    initializeValues() {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.isAuthor$ = combineLatest(
            this.store.pipe(select(articleSelector)),
            this.store.pipe(select(currentUserSelector))
        ).pipe(
            map(
                ([article, currentUser]: [
                ArticleInterface | null,
                CurrentUserInterface | null
            ]) => {
                if(!article || ! currentUser){
                    return false;
                }
                return currentUser.username === article.author.username
            })
        )
    }
}