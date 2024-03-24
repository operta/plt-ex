import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Variant } from '../../store/variants.model';

@Component({
  selector: 'app-variant-list',
  template: `
    <mat-list class="h-full">
      <cdk-virtual-scroll-viewport itemSize="50" class="h-full border-r-2 ">
        <mat-list-item
          *cdkVirtualFor="let variant of variants"
          (click)="onVariantSelected(variant)"
          [activated]="variant.id === selectedVariant?.id"
        >
          {{ variant.name }}
        </mat-list-item>
        <button mat-button color="primary" (click)="onReachedEndOfList()">
          Load more
        </button>
      </cdk-virtual-scroll-viewport>
    </mat-list>
  `,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatListModule, ScrollingModule],
})
export class VariantListComponent {
  @Input({ required: true }) variants!: Variant[];
  @Output() variantSelected: EventEmitter<Variant> =
    new EventEmitter<Variant>();
  @Output() reachedEndOfList: EventEmitter<void> = new EventEmitter<void>();

  selectedVariant?: Variant;

  constructor() {}

  onVariantSelected(variant: Variant) {
    this.selectedVariant = variant;
    this.variantSelected.emit(this.selectedVariant);
  }

  onReachedEndOfList() {
    this.reachedEndOfList.emit();
  }
}
