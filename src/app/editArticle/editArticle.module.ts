import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArticleFormModule } from "../shared/modules/articleForm/articleForm.module";
import { EditArticleService } from "./services/editArticle.service";
import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { EditArticleComponent } from "./components/editArticle/editArticle.component";
import { LoadingModule } from "../shared/modules/loading/loading.module";

@NgModule({
    imports: [CommonModule, ArticleFormModule, LoadingModule],
    declarations: [EditArticleComponent],
    providers: [EditArticleService, SharedArticleService]
})
export class EditArticleModule{

}