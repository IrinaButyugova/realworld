import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { LoadingComponent } from "../../../loading/components/loading/loading.component";
import { ErrorMessageComponent } from "../../../errorMessage/components/errorMessage/errorMessage.component";
import { getPopularTagsAction } from "../../store/actions/getPopularTags";
import { PopularTagType } from "../../../../types/popularTag.type";
import { errorSelector, isLoadingSelector, popularTagsSelector } from "../../store/selectors";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        LoadingComponent, 
        ErrorMessageComponent, 
        RouterModule
    ],
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