import { faker } from '@faker-js/faker';
import { Variant } from './variants.model';

export function generateVariantBatch(size: number): Variant[] {
  const variants: Variant[] = [];
  for (let i = 0; i < size; i++) {
    const variant = generateVariant();
    variants.push(variant);
  }
  return variants;
}

function generateVariant(): Variant {
  return {
    id: faker.string.uuid(),
    name: `Variant ${faker.lorem.word()}`,
    gene: faker.lorem.word(),
    location: `Chromosome ${faker.number.int(22)}:${faker.number.int(1000000)}`,
    variantType: faker.helpers.arrayElement([
      'Missense Mutation',
      'Frameshift Deletion',
      'Insertion',
    ]),
    frequency: `${faker.number.int({ min: 1, max: 10 }) / 100}%`,
    pathogenicity: faker.helpers.arrayElement([
      'Benign',
      'Likely Benign',
      'Uncertain Significance',
      'Likely Pathogenic',
      'Pathogenic',
    ]),
    exon: faker.number.int({ min: 1, max: 20 }),
    clinicalSignificance: faker.lorem.sentence(),
    references: [faker.string.uuid(), faker.string.uuid()],
  };
}
