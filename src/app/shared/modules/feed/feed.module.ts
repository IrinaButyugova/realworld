import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FeedComponent } from "./components/feed/feed.component";
import { FeedService } from "./services/feed.service";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [FeedComponent],
    exports: [FeedComponent],
    providers: [FeedService]
})
export class FeedModule{
    
}