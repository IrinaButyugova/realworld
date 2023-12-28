import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ArticleInputInterface } from "../../../../types/articleInput.interface";
import { BackendErrorsInterface } from "../../../../types/backendErrors.interface";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'rw-article-form',
    templateUrl: './articleForm.component.html'
})
export class ArticleFormComponent{
    @Input('initialValues') initialValuesProps!: ArticleInputInterface | null;
    @Input('isSubmitting') isSubmittingProps!: boolean | null;
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
            title: this.initialValuesProps?.title,
            description: this.initialValuesProps?.description,
            body: this.initialValuesProps?.body,
            tagList: this.initialValuesProps?.tagList.join(' ')
        });
    }

    onSubmit(): void {
        const articleInput : ArticleInputInterface = {
            title: this.form.value.title,
            description: this.form.value.description,
            body: this.form.value.body,
            tagList: this.form.value.tagList.split(' ')
        };
        this.articleSubmitEvent.emit(articleInput);
    }
}