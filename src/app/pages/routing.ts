import { Routes } from "@angular/router";

const Routing: Routes = [
    {
        path: '',
        loadChildren: () => {
            return import('./dashboard/dashboard.module').then((m) => m.DashboardModule);
        }
    },
    {
        path: 'new-proposal',
        loadChildren: () => {
            return import('./new-proposal/new-proposal.module').then((m) => m.NewProposalModule);
        }
    },
    {
        path:'old-proposal',
        loadChildren: () => {
            return import('./old-proposal/old-proposal.module').then((m) => m.OldProposalModule);
        }
    }

]


export { Routing };