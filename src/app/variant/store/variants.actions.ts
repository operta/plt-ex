import { VariantClass } from '../domain/variants.model';

export class LoadVariantBatchRequest {
  static readonly type = '[Variants] Load variant batch request';
  constructor(public batchSize: number) {}
}

export class FilterVariantsRequest {
  static readonly type = '[Variants] Filter variants request';
  constructor(public filter: string) {}
}

export class VariantClassified {
  static readonly type = '[Variants] Variant classified';
  constructor(public variantId: string, public variantClass: VariantClass) {}
}
