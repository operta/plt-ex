import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClassifyVariantComponent } from './component/classify-variant.component';
import { VariantDetailComponent } from './component/variant-detail.component';
import { VariantListComponent } from './component/variant-list.component';
import { VariantExplorerPage } from './variant-explorer.page';

const routes: Routes = [
  {
    path: '',
    component: VariantExplorerPage,
  },
];

@NgModule({
  declarations: [VariantExplorerPage],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    VariantListComponent,
    VariantDetailComponent,
    ClassifyVariantComponent,
  ],
  exports: [RouterModule],
  providers: [],
})
export class VariantModule {}
