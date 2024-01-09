import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription, combineLatest, filter, map } from "rxjs";
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import { Store, select } from "@ngrx/store";

import { errorSelector, isLoadingSelector, userProfileSelector } from "../../store/selectors";
import { getUserProfileAction } from "../../store/actions/getUserProfile.action";
import { currentUserSelector } from "../../../auth/store/selectors";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { followProfileAction } from "../../store/actions/folowProfile.action";
import { FeedComponent } from "../../../shared/modules/feed/components/feed/feed.component";
import { FollowComponent } from "../../../shared/modules/follow/components/follow/follow.component";
import { ProfileInterface } from "../../../shared/types/profile.interface";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        FeedComponent, 
        RouterModule, 
        FollowComponent],
    selector: 'rw-user-profile',
    templateUrl: './userProfile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy{
    userProfile!: ProfileInterface | null;
    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;
    userProfileSubscription!: Subscription;
    slug!: string | null;
    apiUrl!: string;
    isCurrentUserProfile$!: Observable<boolean>;

    constructor(private store: Store, private route: ActivatedRoute, 
        private router: Router){
        
    }

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
    }

    initializeListeners(): void {
        this.userProfileSubscription = this.store
        .pipe(select(userProfileSelector))
        .subscribe((userProfile: ProfileInterface | null) => {
            this.userProfile = userProfile
        });

        this.route.params.subscribe((params: Params) => {
            this.slug = params['slug'];
            this.fetchUserProfile();
        })
    }

    initializeValues(): void {
        this.slug = this.route.snapshot.paramMap.get('slug');
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
        
        this.isCurrentUserProfile$ = combineLatest(
            this.store.pipe(select(currentUserSelector), filter(Boolean)),
            this.store.pipe(select(userProfileSelector), filter(Boolean))
        ).pipe(
            map(
                ([currentUser, userProfile]: [
                    CurrentUserInterface,
                    ProfileInterface
                ]) => {
                    return currentUser.username === userProfile.username;
                }
            )
        );
    }

    fetchUserProfile(): void {
        if(this.slug != null){
            this.store.dispatch(getUserProfileAction({slug: this.slug}));
        }
    }

    getApiUrl(): string{
        const isFavorites = this.router.url.includes('favorites');
        return(this.apiUrl = isFavorites 
        ? `/articles?favorited=${this.slug}`
        : `/articles?author=${this.slug}`);
    }

    onFollow(): void {
        if(this.userProfile == null){
            return;
        }

        this.store.dispatch(
            followProfileAction({
                isFollowed: this.userProfile.following,
                username: this.userProfile.username
            })
        );
    }

    ngOnDestroy(): void {
        this.userProfileSubscription.unsubscribe();
    }
}