import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductItemList } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() data: ProductItemList | null = null;
  @Output() acceptButton: EventEmitter<number> = new EventEmitter<number>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

  handleAccept () {
    this.acceptButton.emit(this.data?.product.id);
    this.closeModal.emit();
  }

}
