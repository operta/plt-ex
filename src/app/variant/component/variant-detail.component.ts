import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Variant } from '../domain/variants.model';
@Component({
  selector: 'app-variant-detail',
  template: `
    <h1>{{ variant.name }}</h1>
    <p><span class="font-semibold">Gene:</span>&nbsp;{{ variant.gene }}</p>
    <p>
      <span class="font-semibold">Location:</span>&nbsp;{{ variant.location }}
    </p>
    <p>
      <span class="font-semibold">Variant Type:</span>&nbsp;{{
        variant.variantType
      }}
    </p>
    <p>
      <span class="font-semibold">Frequency:</span>&nbsp;{{ variant.frequency }}
    </p>
    <p>
      <span class="font-semibold">Pathogenicity:</span>&nbsp;<span
        class="text-red-500"
        >{{ variant.pathogenicity }}</span
      >
    </p>
    <p><span class="font-semibold">Exon:</span>&nbsp;{{ variant.exon }}</p>
    <p>
      <span class="font-semibold">Clinical Significance:</span>&nbsp;{{
        variant.clinicalSignificance
      }}
    </p>
    <p>
      <span class="font-semibold">References:</span>&nbsp;{{
        variant.references
      }}
    </p>
  `,
  standalone: true,
  imports: [CommonModule, MatCardModule],
})
export class VariantDetailComponent {
  @Input({ required: true }) variant!: Variant;

  constructor() {}
}
