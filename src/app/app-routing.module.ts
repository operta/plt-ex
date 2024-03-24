import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'variants',
    loadChildren: () => import('./variant/variant.module').then(m => m.VariantModule)
  },
  {
    path: '',
    redirectTo: 'variants',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
