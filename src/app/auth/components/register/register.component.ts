import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { registerAction } from "../../store/actions/register.actions";
import { isSubmittingSelector } from "../../store/selectors";

@Component({
    selector: 'rw-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    form!: FormGroup;
    isSubmitting$!: Observable<boolean>;

    constructor(private fb: FormBuilder, private store: Store){

    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    initializeForm(): void{
        this.form = this.fb.group({
            username: ['', Validators.required],
            email: '',
            password: ''
        });
    }

    initializeValues(): void{
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    }

    onSubmit(): void{
        this.store.dispatch(registerAction(this.form.value));
    }
}
