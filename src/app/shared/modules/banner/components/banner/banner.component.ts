import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'rw-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent{

}