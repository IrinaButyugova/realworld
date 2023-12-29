import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddToFavoritesComponent } from "./components/addToFavorites/addToFavorites.component";
import { AddToFavoritesService } from "./services/addToFavorites.service";

@NgModule({
    imports: [CommonModule],
    declarations: [AddToFavoritesComponent],
    exports: [AddToFavoritesComponent],
    providers: [AddToFavoritesService]
})
export class AddToFavoritesModule{

}