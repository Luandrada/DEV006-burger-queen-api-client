import {
    ComponentFixture, TestBed,
    fakeAsync, flush, flushMicrotasks
} from '@angular/core/testing';
import { OrderItemComponent } from './order-item.component';
import { ModalComponent } from '../modal/modal.component';

import { menu } from '../../../../shared/models/Product';



describe('MenuComponent', () => {
    let fixture: ComponentFixture<OrderItemComponent>;
    let component: OrderItemComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OrderItemComponent, ModalComponent],
        });
        fixture = TestBed.createComponent(OrderItemComponent);
        component = fixture.componentInstance;
    });


    it('first load must show the product info and the subtotal price correctly', async () => {
        const item = {
            qty: 10,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        const productNameElement = fixture.nativeElement.querySelector('.name');
        expect(productNameElement.innerHTML).toBe('hamburguesa');

        const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
        expect(subtotalPriceElement.innerHTML).toBe("$5000");
    });

    it('if the user clicks in minus button and the qty is greater than 1 the component must emit a productId with the new Qty  ', fakeAsync(async () => {
        const item = {
            qty: 10,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        fixture.componentInstance.updateQuantity.subscribe((event: { productId: Number, newQty: Number }) => {
            expect(event.productId).toBe(1);
            expect(event.newQty).toBe(9);
        })

        const productNameElement = fixture.nativeElement.querySelector('.fa-circle-minus');
        const event = new Event('click');
        productNameElement.dispatchEvent(event);
        flush();
    }));

    it('if the user clicks in minus button and the qty is less than 1 the component must open the modal to comfirm remove element', fakeAsync(async () => {
        const item = {
            qty: 1,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        const productNameElement = fixture.nativeElement.querySelector('.fa-circle-minus');
        const event = new Event('click');
        productNameElement.dispatchEvent(event);
        flushMicrotasks();
        fixture.detectChanges();

        const modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement.innerHTML).toBe('¿ Desea eliminar "hamburguesa" de su orden?')
    }));

    it('if the user clicks in plus the component must emit a productId with the new Qty  ', fakeAsync(async () => {
        const item = {
            qty: 10,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        fixture.componentInstance.updateQuantity.subscribe((event: { productId: Number, newQty: Number }) => {
            expect(event.productId).toBe(1);
            expect(event.newQty).toBe(11);
        })

        const productNameElement = fixture.nativeElement.querySelector('.fa-circle-plus');
        const event = new Event('click');
        productNameElement.dispatchEvent(event);
        flush();
    }));

    it('if the user clicks in trash button the component must open the modal to comfirm remove element', async () => {
        const item = {
            qty: 1,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        const productNameElement = fixture.nativeElement.querySelector('.fa-trash-can');
        const event = new Event('click');
        productNameElement.dispatchEvent(event);

        fixture.detectChanges();

        const modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement.innerHTML).toBe('¿ Desea eliminar "hamburguesa" de su orden?')
    });

    it('if the user clicks in modal cancel button the component must close the modal', async () => {
        const item = {
            qty: 1,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();

        const productNameElement = fixture.nativeElement.querySelector('.fa-trash-can');
        let event = new Event('click');
        productNameElement.dispatchEvent(event);

        fixture.detectChanges();

        let modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement.innerHTML).toBe('¿ Desea eliminar "hamburguesa" de su orden?')

        const cancelButton = fixture.nativeElement.querySelector('.btn-sec');
        event = new Event('click');
        cancelButton.dispatchEvent(event);

        fixture.detectChanges();

        modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement).toBeNull();

    });

    it('if the user clicks in modal accept button the component must close the modal and emit a productId with the new Qty', fakeAsync(async () => {
        const item = {
            qty: 1,
            product: {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno' as menu,
                dataEntry: "2022-03-05 15:14:10"
            }
        }
        component.item = item;
        fixture.detectChanges();


        fixture.componentInstance.itemToRemove.subscribe((productId: Number) => {
            expect(productId).toBe(1);
        })

        const productNameElement = fixture.nativeElement.querySelector('.fa-trash-can');
        let event = new Event('click');
        productNameElement.dispatchEvent(event);

        fixture.detectChanges();

        let modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement.innerHTML).toBe('¿ Desea eliminar "hamburguesa" de su orden?')

        const cancelButton = fixture.nativeElement.querySelector('.btn-ppal');
        event = new Event('click');
        cancelButton.dispatchEvent(event);

        fixture.detectChanges();

        modalTitleElement = fixture.nativeElement.querySelector('#modal-rmeove-item-title');
        expect(modalTitleElement).toBeNull();

        flushMicrotasks();

    }));



})


