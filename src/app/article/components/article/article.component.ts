import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription, combineLatest, map } from "rxjs";

import { articleSelector, errorSelector, isLoadingSelector } from "../../store/selectors";
import { getArticleAction } from "../../store/actions/getArticle.action";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { deleteArticleAction } from "../../store/actions/deleteArticle.action";
import { followProfileAction } from "../../store/actions/folowProfile.action";
import { ArticleInterface } from "../../../shared/types/article.interface";
import { ErrorMessageComponent } from "../../../shared/modules/errorMessage/components/errorMessage/errorMessage.component";
import { LoadingComponent } from "../../../shared/modules/loading/components/loading/loading.component";
import { TagListComponent } from "../../../shared/modules/tagList/components/tagList/tagList.component";
import { FollowComponent } from "../../../shared/modules/follow/components/follow/follow.component";
import { CommentsComponent } from "../../../shared/modules/comments/components/comments/comments.component";


@Component({
    selector: 'rw-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        ErrorMessageComponent, 
        LoadingComponent, 
        TagListComponent,
        FollowComponent,
        CommentsComponent
    ]
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

    deleteArticle(): void {
        if(this.slug !== null){
            this.store.dispatch(deleteArticleAction({slug: this.slug}));
        }
    }

    onFollow(): void {
        if(this.article == null){
            return;
        }

        this.store.dispatch(
            followProfileAction({
                isFollowed: this.article.author.following,
                username: this.article.author.username
            })
        );
    }
}