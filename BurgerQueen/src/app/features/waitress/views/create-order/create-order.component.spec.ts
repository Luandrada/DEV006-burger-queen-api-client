import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {
    HttpClient,
} from '@angular/common/http';

import {
    ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrderComponent } from './create-order.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { OrderDetailComponent } from '../../components/order-detail/order-detail.component';
import { OrderItemComponent } from '../../components/order-item/order-item.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from 'src/app/@core/services/product.service';
import { CalculateTotalPipe } from '../../pipes/calculate-total.pipe';
import { ModalComponent } from '../../components/modal/modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastService } from 'src/app/shared/components/toast/toast.service';

describe('Create Oder Component', () => {
    let fixture: ComponentFixture<CreateOrderComponent>;
    let httpTestingController: HttpTestingController;
    const spy = jasmine.createSpyObj('ToastService', ['show']);
    let toastServiceSpy: jasmine.SpyObj<ToastService>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, NgxSpinnerModule],
            declarations: [
                CreateOrderComponent,
                MenuComponent,
                OrderDetailComponent,
                ProductCardComponent,
                OrderItemComponent,
                CalculateTotalPipe,
                ModalComponent,
                
            ],
            providers: [
                {
                    provide: ProductService,
                },
                { provide: HttpClient },
                { provide: ToastService, useValue: spy }
            ],
        });
        fixture = TestBed.createComponent(CreateOrderComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;

        await fixture.whenStable();
        fixture.detectChanges();


        // Mock Request Products
        const mock = httpTestingController.expectOne('http://localhost:8089/products');
        mock.flush([
            {
                id: 1,
                name: 'hamburguesa',
                price: 500,
                image: "url de la imagen",
                type: 'Desayuno',
                dataEntry: "2022-03-05 15:14:10",
            },
            {
                id: 1,
                name: 'hotcakes',
                price: 300,
                image: "url de la imagen",
                type: 'Desayuno',
                dataEntry: "2022-03-05 15:14:10",
            },
            {
                id: 2,
                name: 'tacos',
                price: 1000,
                image: "url de la imagen",
                type: 'Almuerzo',
                dataEntry: "2022-03-05 15:14:10",
            }
        ]);
        fixture.detectChanges();

    });


    describe("Add items to order", () => {

        it('since product card', (async () => {
            // click to select a product
            const card = fixture.nativeElement.querySelector('app-product-card');
            const event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            // Validate that product was added to the order
            const productNameElement = fixture.nativeElement.querySelector('.name');
            expect(productNameElement.innerHTML).toBe('hamburguesa');

            const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
            expect(subtotalPriceElement.innerHTML).toBe("$500");

        }));

        it('increases item qty since product card', (async () => {
            // click to select a product
            let card = fixture.nativeElement.querySelector('app-product-card');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            card = fixture.nativeElement.querySelector('app-product-card');
            event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            // Validate that product was added to the order
            const productNameElement = fixture.nativeElement.querySelector('.name');
            expect(productNameElement.innerHTML).toBe('hamburguesa');

            const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
            expect(subtotalPriceElement.innerHTML).toBe("$1000");

            const qtyElement = fixture.nativeElement.querySelector('.item-qty');
            expect(qtyElement.innerHTML).toBe("2");

        }));

        it('from order item plus button', (async () => {
            // click to select a product
            let card = fixture.nativeElement.querySelector('app-product-card');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();


            // click in the plus button of the hamburgusa
            card = fixture.nativeElement.querySelector('.fa-circle-plus');
            event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            // validate that the product was updated successfully
            const productNameElement = fixture.nativeElement.querySelector('.name');
            expect(productNameElement.innerHTML).toBe('hamburguesa');

            const qtyElement = fixture.nativeElement.querySelector('.item-qty');
            expect(qtyElement.innerHTML).toBe('2');

            const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
            expect(subtotalPriceElement.innerHTML).toBe("$1000");


        }));

    });

    describe("Remove items to order or decreases qty ", () => {

        beforeEach(() => {
            // add 2 items in the orden 
            const card = fixture.nativeElement.querySelector('app-product-card');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();
            event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

        })

        it('decreases qty from minus button', (async () => {
            // click to remove item
            const card = fixture.nativeElement.querySelector('.fa-circle-minus');
            const event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            const productNameElement = fixture.nativeElement.querySelector('.name');
            expect(productNameElement.innerHTML).toBe('hamburguesa');

            const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
            expect(subtotalPriceElement.innerHTML).toBe("$500");

            const qtyElement = fixture.nativeElement.querySelector('.item-qty');
            expect(qtyElement.innerHTML).toBe("1");
        }));

        it('remove item from tash button', (async () => {
            // click to remove item
            const card = fixture.nativeElement.querySelector('.fa-trash-can');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();


            const btnConfirm = fixture.nativeElement.querySelector('#btn-confirm-remove-item');
            event = new Event('click');
            btnConfirm.dispatchEvent(event);
            fixture.detectChanges();


            const placeholderElement = fixture.nativeElement.querySelector('.placeholder');
            expect(placeholderElement.innerHTML).toEqual('- Agregue productos a su orden - ');

        }));

        it('remove item from minus button when qty is 1', (async () => {
            // click to remove item
            let card = fixture.nativeElement.querySelector('.fa-circle-minus');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            const productNameElement = fixture.nativeElement.querySelector('.name');
            expect(productNameElement.innerHTML).toBe('hamburguesa');

            const subtotalPriceElement = fixture.nativeElement.querySelector('.subtotal-price');
            expect(subtotalPriceElement.innerHTML).toBe("$500");

            const qtyElement = fixture.nativeElement.querySelector('.item-qty');
            expect(qtyElement.innerHTML).toBe("1");

            // Second click is needed because if the before each we add a item with qty 2
            card = fixture.nativeElement.querySelector('.fa-circle-minus');
            event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();


            const btnConfirm = fixture.nativeElement.querySelector('#btn-confirm-remove-item');
            event = new Event('click');
            btnConfirm.dispatchEvent(event);
            fixture.detectChanges();


            const placeholderElement = fixture.nativeElement.querySelector('.placeholder');
            expect(placeholderElement.innerHTML).toEqual('- Agregue productos a su orden - ');

        }));


    });

    describe("Save Order",()=>{

        beforeEach(() => {
            // add 2 items in the orden 
            const card = fixture.nativeElement.querySelector('app-product-card');
            let event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            event = new Event('click');
            card.dispatchEvent(event);
            fixture.detectChanges();

            const nameInputElement = fixture.nativeElement.querySelector('#clientName');    
            nameInputElement.value = 'Carlos';
            nameInputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
    
            const tableInputElement = fixture.nativeElement.querySelector('#mesa');
            tableInputElement.value = 5;
            tableInputElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

        })

        it("when the user click in save the form should be hide and spinner should be in the dom", () => {
            const btnElement = fixture.nativeElement.querySelector('.btnSend');
            const event = new Event('click')
            btnElement.dispatchEvent(event)
            fixture.detectChanges();

            const spineer = fixture.debugElement.nativeElement.querySelector('#spinner-wrapper');
            expect(spineer).toBeTruthy();
        })

        it("when the user click in save and the request works should reset the order", () => {
            const btnElement = fixture.nativeElement.querySelector('.btnSend');
            const event = new Event('click')
            btnElement.dispatchEvent(event)
            fixture.detectChanges();

            const mock = httpTestingController.expectOne('http://localhost:8089/orders');
            mock.flush({
                userId: 1,
                customer: "Carlos",
                table: 5,
                items: {
                  1: {
                    qty:2, 
                    product: {
                        id: 1,
                        name: 'hamburguesa',
                        price: 500,
                        image: "url de la imagen",
                        type: 'Desayuno',
                        dataEntry: "2022-03-05 15:14:10",
                    },
                  }
                },
                status: "pending",
            });

            fixture.detectChanges();

            const placeholderElement = fixture.nativeElement.querySelector('.placeholder');
            expect(placeholderElement.innerHTML).toEqual('- Agregue productos a su orden - ');
        });

        it("when the user click in save and the request fails should shopw the toast message", () => {
            const btnElement = fixture.nativeElement.querySelector('.btnSend');
            const event = new Event('click')
            btnElement.dispatchEvent(event)
            fixture.detectChanges();

            const mock = httpTestingController.expectOne('http://localhost:8089/orders');
            mock.flush('',{status:500, statusText:""});

            fixture.detectChanges();
            expect(toastServiceSpy.show.calls.count()).toBe(1)
            
        })

    });

})

