import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { Store } from '@ngxs/store';
import { VariantClassified } from '../store/variants.actions';
import {
  Variant,
  VariantClass,
  getVariantClassOptions,
} from '../domain/variants.model';

@Component({
  selector: 'app-classify-variant',
  template: `<p class="font-semibold">Classification:</p>
    <mat-radio-group
      aria-label="Select an option"
      [(ngModel)]="variant.classification"
      (change)="onClassification($event)"
    >
      <div class="flex flex-row justify-between w-9/12">
        <mat-radio-button
          *ngFor="let class of variantClasses"
          [value]="class.enumValue"
        >
          {{ class.stringValue }}
        </mat-radio-button>
      </div>
    </mat-radio-group> `,
  standalone: true,
  imports: [CommonModule, FormsModule, MatRadioModule],
})
export class ClassifyVariantComponent {
  @Input({ required: true }) variant!: Variant;
  variantClasses: { stringValue: string; enumValue: VariantClass }[] =
    getVariantClassOptions();

  constructor(private store: Store) {}

  onClassification(event: MatRadioChange) {
    this.store.dispatch(new VariantClassified(this.variant.id, event.value));
  }
}
