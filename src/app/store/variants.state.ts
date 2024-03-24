import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ApiService } from '../service/api.service';
import {
  FilterVariantsRequest,
  LoadVariantBatchRequest,
  VariantClassified,
} from './variants.actions';
import { Variant } from './variants.model';

export interface VariantsStateModel {
  variants: Variant[];
  filteredVariants: Variant[];
  searchTerm?: string;
}

@Injectable()
@State<VariantsStateModel>({
  name: 'variants',
  defaults: {
    variants: [],
    filteredVariants: [],
  },
})
export class VariantsState {
  constructor(private apiService: ApiService) {}

  @Selector()
  static variants(state: VariantsStateModel): Variant[] {
    return state.variants;
  }

  @Selector()
  static filteredVariants(state: VariantsStateModel): Variant[] {
    return state.filteredVariants;
  }

  @Selector()
  static searchTerm(state: VariantsStateModel): string | undefined {
    return state.searchTerm;
  }

  @Action(LoadVariantBatchRequest)
  loadVariantBatch(
    ctx: StateContext<VariantsStateModel>,
    action: LoadVariantBatchRequest
  ): void {
    const state = ctx.getState();
    const allVariants = [
      ...state.variants,
      ...this.apiService.loadVariantBatch(action.batchSize),
    ];
    ctx.patchState({
      variants: allVariants,
      filteredVariants: allVariants,
      searchTerm: '',
    });
  }

  @Action(VariantClassified)
  variantClassified(
    ctx: StateContext<VariantsStateModel>,
    action: VariantClassified
  ): void {
    const state = ctx.getState();
    const variants = state.variants.map((variant) => {
      if (variant.id === action.variantId) {
        return { ...variant, classification: action.variantClass } as Variant;
      }
      return variant;
    });
    ctx.patchState({
      variants,
      filteredVariants: this.filterBySearchTerm(variants, state.searchTerm),
    });
  }

  @Action(FilterVariantsRequest)
  filterVariants(
    ctx: StateContext<VariantsStateModel>,
    action: FilterVariantsRequest
  ): void {
    const state = ctx.getState();
    ctx.patchState({
      searchTerm: action.filter,
      filteredVariants: this.filterBySearchTerm(state.variants, action.filter),
    });
  }

  private filterBySearchTerm(
    variants: Variant[],
    searchTerm?: string
  ): Variant[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return variants;
    }
    return variants.filter((variant) => variant.name.includes(searchTerm));
  }
}
