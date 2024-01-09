import { Component, Input } from "@angular/core";
import { PopularTagType } from "../../../../types/popularTag.type";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'rw-tag-list',
    templateUrl: './tagList.component.html',
    styleUrls: ['./tagList.component.scss']
})
export class TagListComponent{
    @Input('tags') tagsProps!: PopularTagType[];
}