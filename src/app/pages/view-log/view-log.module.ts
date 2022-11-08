import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { ViewLogComponent } from "./view-log.component";
import { LogsComponent } from './component/logs/logs.component';
import { ViewProposalsComponent } from './component/view-proposals/view-proposals.component';
import { ViewLogRoutingModule } from "./module/routing/view-log-routing.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";
import { DatePipe } from "@angular/common";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { FormControl } from "@angular/forms";
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClientModule } from "@angular/common/http";
@NgModule({
    declarations: [
     ViewLogComponent,
     LogsComponent,
     ViewProposalsComponent
    ],
    imports: [MatSortModule,
       

        ViewLogRoutingModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        CommonModule,
       ReactiveFormsModule,
       HttpClientModule,
       DatePipe
   
        
    ]
})
export class ViewLogModule {}