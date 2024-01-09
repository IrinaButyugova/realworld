import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

import { RouterModule } from "@angular/router";
import { Observable,  } from "rxjs";
import { Store, select } from "@ngrx/store";
import { currentUserSelector, isAnonymousSelector, isLoggedInSelector } from "../../../../auth/store/selectors";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule
    ],
    selector: 'mc-topBar',
    templateUrl: './topBar.component.html',
    styleUrls: ['./topBar.component.scss']
})
export class TopBarComponent implements OnInit{
    isLoggedIn$!: Observable<boolean>;
    isAnonymous$!: Observable<boolean>;
    currentUser$!: Observable<any>;

    constructor(private store: Store){

    }

    ngOnInit(): void {
        this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
        this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
        this.currentUser$ = this.store.pipe(select(currentUserSelector));
    }
}