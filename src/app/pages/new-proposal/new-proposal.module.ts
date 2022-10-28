import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NewProposalClientInfoComponent } from "./component/client-info/client-info.component";
import { NewProposalRequirementInfoComponent } from "./component/requirement-info/requirement-info.component";
import { NewProposalMaterialModule } from "./module/material/new-proposal-material.module";
import { NewProposalRoutingModule } from "./module/routing/new-proposal-routing.module";
import { NewProposalComponent } from "./new-proposal.component";
import { ConflictComponent } from "./component/conflict/conflict.component";
@NgModule({
    declarations: [
        NewProposalComponent,
        NewProposalClientInfoComponent,
        ConflictComponent,
        NewProposalRequirementInfoComponent
    ],
    imports: [
        CommonModule,
        NewProposalRoutingModule,
        NewProposalMaterialModule,
        ReactiveFormsModule
    ]
})
export class NewProposalModule {}