import { Component, OnDestroy, OnInit } from "@angular/core";
import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { Observable, Subscription, filter } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { currentUserSelector } from "../../../auth/store/selectors";
import { BackendErrorsInterface } from "../../../shared/types/backendErrors.interface";
import { isSubmittingSelector, validationErrorsSelector } from "../../store/selectors";
import { CurrentUserInputInterface } from "../../../shared/types/currentUserInput.interface";
import { updateCurrentUserAction } from "../../../auth/store/actions/updateCurrentUser.action";
import { logoutAction } from "../../../auth/store/actions/sync.action";

@Component({
    selector: 'rw-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy{
    currentUser!: CurrentUserInterface;
    currentUserSubscription!: Subscription;
    form!: FormGroup;
    isSubmitting$!: Observable<boolean>;
    backendErrors$!: Observable<any> 

    constructor(private fb: FormBuilder, private store: Store){
        
    }

    ngOnInit(): void {
        this.initializeValues();
        this.initializeListeners();
    }

    initializeValues() {
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
        this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
    }

    initializeListeners() {
        this.currentUserSubscription = this.store
        .pipe(
            select(currentUserSelector), 
            filter(Boolean))
        .subscribe((currentUser: CurrentUserInterface) => {
            this.currentUser = currentUser;
            this.initializeForm()
        });
    }

    initializeForm() {
       this.form = this.fb.group({
        image: this.currentUser.image,
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        password: ''
       }); 
    }

    submit(): void {
        const currentUserInput: CurrentUserInputInterface = {
            ...this.currentUser,
            ...this.form.value
        };
        this.store.dispatch(updateCurrentUserAction({currentUserInput}));
    }

    logout(): void {
        this.store.dispatch(logoutAction());
    }

    ngOnDestroy(): void {
        this.currentUserSubscription.unsubscribe();
    }
}