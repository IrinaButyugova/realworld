import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

import { UtilsService } from "../../../../services/utils.service";

@Component({
    standalone: true,
    imports: [
        CommonModule, 
        RouterModule
    ],
    selector: 'rw-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
    @Input('total') totalProps!: number | undefined;
    @Input('limit') limitProps!: number;
    @Input('currentPage') currentPageProps!: number;
    @Input('url') urlProps!: string;

    pagesCount!: number;
    pages!: number[];

    constructor(private utilsService: UtilsService){
        
    }

    ngOnInit(): void {
        if(this.totalProps){
            this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
            this.pages = this.utilsService.range(1, this.pagesCount);
        }
    }
}