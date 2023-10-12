import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductItemList } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() product: ProductItemList | null = null;
  @Output() acceptButton: EventEmitter<number> = new EventEmitter<number>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleAccept () {
    this.acceptButton.emit(this.product?.product.id);
    this.closeModal.emit();
  }
}
