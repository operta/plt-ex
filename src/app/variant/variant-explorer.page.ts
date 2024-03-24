import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import {
  FilterVariantsRequest,
  LoadVariantBatchRequest,
} from '../store/variants.actions';
import { Variant } from '../store/variants.model';
import { VariantsState } from '../store/variants.state';

@Component({
  selector: 'app-variants',
  template: `
    <div class="h-[calc(100vh-71px)] overflow-hidden p-5">
      <ng-container
        *ngIf="filteredVariants$ | async as variants; else noVariants"
      >
        <div class="flex flex-row h-4/6">
          <div class="basis-1/4  p-2">
            <input
              type="text"
              [(ngModel)]="searchTerm"
              (input)="onSearchInput(searchTerm)"
              class="pretty-input mb-2"
              placeholder="Search for variants"
              required
            />
            <div
              class="h-full overflow-scroll"
              [infiniteScrollDistance]="2"
              infiniteScroll
              [scrollWindow]="false"
              (scrolled)="onVariantListScrollFinished()"
            >
              <app-variant-list
                [variants]="variants"
                (variantSelected)="onVariantSelected($event)"
                (reachedEndOfList)="onVariantListScrollFinished()"
              >
              </app-variant-list>
            </div>
          </div>

          <div class="basis-3/4 p-2">
            <ng-container *ngIf="selectedVariant; else noVariantSelected">
              <div class="mb-5">
                <app-variant-detail
                  [variant]="selectedVariant"
                ></app-variant-detail>
              </div>
              <hr />
              <div class="mt-5">
                <app-classify-variant
                  [variant]="selectedVariant"
                ></app-classify-variant>
              </div>
            </ng-container>
            <ng-template #noVariantSelected>
              <p>No variant selected</p>
            </ng-template>
          </div>
        </div>
      </ng-container>
      <ng-template #noVariants>
        <p>No variants found</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .pretty-input {
        @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
      }
    `,
  ],
})
export class VariantExplorerPage implements OnDestroy {
  filteredVariants$: Observable<Variant[]>;
  selectedVariant?: Variant;
  searchTerm?: string;
  private batchSize = 10000;
  private searchTermSubscription: Subscription;

  constructor(private store: Store) {
    this.filteredVariants$ = this.store.select(VariantsState.filteredVariants);
    this.searchTermSubscription = this.store
      .select(VariantsState.searchTerm)
      .subscribe((searchTerm) => {
        this.searchTerm = searchTerm;
      });

    this.store.dispatch(new LoadVariantBatchRequest(this.batchSize));
  }

  onVariantSelected(variant: Variant) {
    this.selectedVariant = variant;
  }

  onSearchInput(searchTerm: string | undefined) {
    // TODO debounce
    if (searchTerm === undefined) return;
    this.store.dispatch(new FilterVariantsRequest(searchTerm));
  }

  onVariantListScrollFinished() {
    this.store.dispatch(new LoadVariantBatchRequest(this.batchSize));
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }
}
