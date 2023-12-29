import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FollowComponent } from "./components/follow/follow.component";
import { FollowService } from "./services/follow.service";

@NgModule({
    imports: [CommonModule],
    declarations: [FollowComponent],
    exports: [FollowComponent],
    providers: [FollowService]  
})
export class FollowModule{

}