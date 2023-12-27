import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CreateArticleComponent } from "./components/createArticle/createArticle.component";
import { ArticleFormModule } from "../shared/modules/articleForm/articleForm.module";

@NgModule({
    imports: [CommonModule, ArticleFormModule],
    declarations: [CreateArticleComponent]
})
export class CreateArticleModule{

}