import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { isLoggedInSelector } from "../../../../../auth/store/selectors";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule],
    selector: 'rw-feed-toggler',
    templateUrl: './feedToggler.component.html'
})
export class FeedTogglerComponent implements OnInit{
    @Input('tagName') tagNameProps!: string | null;

    isLoggedIn$!: Observable<boolean>;

    constructor(private store: Store){
        
    }

    ngOnInit(): void {
        this.initializeValues();
    }

    initializeValues(): void {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
    }
}