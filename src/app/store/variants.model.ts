export interface Variant {
  id: string;
  name: string;
  gene: string;
  location: string;
  variantType: string;
  frequency: string;
  pathogenicity: string;
  exon?: number;
  clinicalSignificance?: string;
  references?: string[];
  classification?: VariantClass;
}

export enum VariantClass {
  'Benign',
  'Likely Benign',
  'Uncertain Significance',
  'Likely Pathogenic',
  'Pathogenic',
}

export type VariantClassOption = {
  stringValue: string;
  enumValue: VariantClass;
};

export function getVariantClassOptions(): VariantClassOption[] {
  return Object.entries(VariantClass)
    .filter(([value]) => isNaN(Number(value)))
    .map(([key]) => {
      const enumValue = VariantClass[key as keyof typeof VariantClass];
      return { stringValue: key, enumValue };
    });
}
