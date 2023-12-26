import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { getPopularTagsAction } from "../../store/actions/getPopularTags";
import { Observable } from "rxjs";
import { PopularTagType } from "../../../../types/popularTag.type";
import { errorSelector, isLoadingSelector, popularTagsSelector } from "../../store/selectors";

@Component({
    selector: 'rw-popular-tags',
    templateUrl: './popularTags.component.html',
    styleUrls: ['./popularTags.component.scss']
})
export class PopularTagsComponent implements OnInit{
    popularTags$!: Observable<PopularTagType[] | null>;
    isLoading$!: Observable<boolean>;
    error$!: Observable<string | null>;

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.initializeValues();
        this.fetchData();
    }

    fetchData(): void {
        this.store.dispatch(getPopularTagsAction());
    }

    initializeValues(): void {
        this.popularTags$ = this.store.pipe(select(popularTagsSelector));
        this.isLoading$ = this.store.pipe(select(isLoadingSelector));
        this.error$ = this.store.pipe(select(errorSelector));
    }
}