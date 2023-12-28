import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddToFavoritesComponent } from "./components/addToFavorites/addToFavorites.component";
import { AddToFavoritesService } from "./services/addToFavorites";

@NgModule({
    imports: [CommonModule],
    declarations: [AddToFavoritesComponent],
    exports: [AddToFavoritesComponent],
    providers: [AddToFavoritesService]
})
export class AddToFavoritesModule{

}