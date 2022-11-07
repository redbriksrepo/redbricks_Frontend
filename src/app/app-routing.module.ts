import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('./layout/layout.module').then((m) => m.LayoutModule);
    }
  },
  {
    path: 'auth',
    loadChildren: () => {
      return import('./auth/auth.module').then((m) => m.AuthModule);
    }
  },
  {
    path: 'view-log',
    loadChildren: () => {
      return import('./pages/view-log/view-log.module').then((m)=> m.ViewLogModule);
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
