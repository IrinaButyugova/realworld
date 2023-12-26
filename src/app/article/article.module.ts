import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ArticleService as SharedArticleService } from "../shared/services/article.service";
import { RouterModule } from "@angular/router";
import { ErrorMessageModule } from "../shared/modules/errorMessage/errorMessage.module";
import { LoadingModule } from "../shared/modules/loading/loading.module";
import { ArticleComponent } from "./components/article/article.component";
import { TagListModule } from "../shared/modules/tagList/tagList.module";

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        ErrorMessageModule, 
        LoadingModule, 
        TagListModule
    ],
    declarations: [ArticleComponent],
    exports: [],
    providers: [SharedArticleService]
})
export class ArticleModule{
    
}