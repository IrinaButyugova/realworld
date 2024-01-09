import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import queryString  from 'query-string';

import { ErrorMessageComponent } from "../../../errorMessage/components/errorMessage/errorMessage.component";
import { AddToFavoritesComponent } from "../../../addToFavorites/components/addToFavorites/addToFavorites.component";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { LoadingComponent } from "../../../loading/components/loading/loading.component";
import { PaginationComponent } from "../../../pagination/components/pagination/pagination.component";
import { TagListComponent } from "../../../tagList/components/tagList/tagList.component";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule, 
        ErrorMessageComponent, 
        LoadingComponent,
        PaginationComponent,
        TagListComponent,
        AddToFavoritesComponent
    ],
    selector: 'rw-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges, OnDestroy{
    @Input('apiUrl') apiUrlProps!: string

    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;
    feed$!: Observable<GetFeedResponseInterface | null>;
    limit = 10;
    baseUrl!: string;
    queryParamsSubscription!: Subscription;
    currentPage!: number;

    constructor(private store: Store, 
        private router: Router,
        private route: ActivatedRoute){
        
    }

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const isApiUrlChanged = !changes['apiUrlProps'].firstChange &&
        changes['apiUrlProps'].currentValue !== changes['apiUrlProps'].previousValue;
        if(isApiUrlChanged){
            this.fetchFeed();
        }
    }

    initializeListeners() {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: Params) => {
                this.currentPage = Number(params['page'] || '1');
                this.fetchFeed();
            }
        );
    }

    fetchFeed() {
        const offset = this.currentPage * this.limit - this.limit;
        const parsedUrl = queryString.parseUrl(this.apiUrlProps);
        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query
        });
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
        this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
    }

    initializeValues() {
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        this.feed$ = this.store.pipe(select(feedSelector));
        this.baseUrl = this.router.url.split('?')[0];
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }
}