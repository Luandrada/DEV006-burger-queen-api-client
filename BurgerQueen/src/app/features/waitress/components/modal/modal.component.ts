import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() item!: Item;
  @Output() acceptButton: EventEmitter<number> = new EventEmitter<number>();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
}
