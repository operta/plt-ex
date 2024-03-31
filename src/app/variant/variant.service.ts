import { Injectable } from '@angular/core';
import { generateVariantBatch } from './domain/variant.factory';
import { Variant } from './domain/variants.model';

@Injectable()
export class VariantService {
  constructor() {}

  public loadVariantBatch(size: number): Variant[] {
    return generateVariantBatch(size);
  }
}
