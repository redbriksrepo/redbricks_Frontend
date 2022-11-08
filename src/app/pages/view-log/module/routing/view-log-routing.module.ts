import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ViewLogComponent } from "../../view-log.component";
import { LogsComponent } from "../../component/logs/logs.component";
const routes: Routes = [
    {
        path: '',
        component: ViewLogComponent,
        children: [
            {
                path: '',
                redirectTo: 'logs',
                pathMatch: 'full'
            },
            {
                path: 'logs',
                component: LogsComponent
            }
           
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ViewLogRoutingModule {}