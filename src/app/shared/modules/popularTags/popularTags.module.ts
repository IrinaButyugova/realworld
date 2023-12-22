import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PopularTagsService } from "./services/popularTags.service";
import { PopularTagsComponent } from "./components/popularTags/popularTags.component";
import { LoadingModule } from "../loading/loading.module";
import { ErrorMessageModule } from "../errorMessage/errorMessage.module";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, LoadingModule, ErrorMessageModule, RouterModule],
    providers: [PopularTagsService],
    declarations: [PopularTagsComponent],
    exports: [PopularTagsComponent]
})
export class PopularTagsModule{

}