import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClassifyVariantComponent } from './component/classify-variant.component';
import { VariantDetailComponent } from './component/variant-detail.component';
import { VariantListComponent } from './component/variant-list.component';
import { VariantExplorerPage } from './page/variant-explorer.page';
import { VariantService } from './variant.service';
import { NgxsModule } from '@ngxs/store';
import { VariantsState } from './store/variants.state';

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
    NgxsModule.forFeature([VariantsState]),
    InfiniteScrollModule,
    VariantListComponent,
    VariantDetailComponent,
    ClassifyVariantComponent,
  ],
  exports: [RouterModule],
  providers: [VariantService],
})
export class VariantModule {}
