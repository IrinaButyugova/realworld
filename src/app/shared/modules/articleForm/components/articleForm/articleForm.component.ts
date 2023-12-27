import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ArticleInputInterface } from "../../../../types/articleInput.interface";
import { BackendErrorsInterface } from "../../../../types/backendErrors.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'rw-article-form',
    templateUrl: './articleForm.component.html'
})
export class ArticleFormComponent{
    @Input('initialValues') initialValuesProps!: ArticleInputInterface;
    @Input('isSubmitting') isSubmittingProps!: boolean;
    @Input('errors') errorsProps!: BackendErrorsInterface | null;

    @Output('articleSubmit') articleSubmitEvent = new EventEmitter<
    ArticleInputInterface>();

    form!: FormGroup;

    constructor(private fb: FormBuilder){

    }

    ngOnInit(): void{
        this.initializeForm();
    }

    initializeForm() {
        this.form = this.fb.group({
            title: this.initialValuesProps.title,
            description: this.initialValuesProps.description,
            body: this.initialValuesProps.body,
            tagList: this.initialValuesProps.tagList.join(' ')
        });
    }

    onSubmit(): void {
        this.articleSubmitEvent.emit(this.form.value);
    }
}