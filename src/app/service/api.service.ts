import { Injectable } from '@angular/core';
import { generateVariantBatch } from '../store/variant.factory';
import { Variant } from '../store/variants.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  public loadVariantBatch(size: number): Variant[] {
    return generateVariantBatch(size);
  }
}
