import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {
    HttpClient,
} from '@angular/common/http';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ProductService } from 'src/app/@core/services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../../../shared/models/Product';


describe('MenuComponent', () => {
    let fixture: ComponentFixture<MenuComponent>;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MenuComponent, ProductCardComponent],
            providers: [
                {
                    provide: ProductService,
                },
                { provide: HttpClient },
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ],
        });
        fixture = TestBed.createComponent(MenuComponent);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture.detectChanges();
    });


    it('if the request to get products fails should show the message ', (async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const spineer = fixture.debugElement.nativeElement.querySelector('.spinner-border');
        expect(spineer).toBeTruthy();

        const mock = httpTestingController.expectOne('http://localhost:8089/products');
        mock.flush('', { status: 404, statusText: "" });
        fixture.detectChanges();

        const errorElement = fixture.nativeElement.querySelector('#error-message');
        expect(errorElement.innerHTML).toEqual(' no se pudieron obtener los productos por favor intenta de nuevo ');
    }));

    it('in the firts load after loading should exist produsts of type Desayuno because is default state', (async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const spineer = fixture.debugElement.nativeElement.querySelector('.spinner-border');
        expect(spineer).toBeTruthy();

        const mock = httpTestingController.expectOne('http://localhost:8089/products');
        mock.flush([{
            id: 1,
            name: 'hamburguesa',
            price: 500,
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

        const cards = fixture.nativeElement.querySelector('.product-card > .name');
        expect(cards.innerHTML).toEqual('hamburguesa');
    }));

    it('if click in menu button Almuerzo change the list of products with products of type Almuerzo', (async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const spineer = fixture.debugElement.nativeElement.querySelector('.spinner-border');
        expect(spineer).toBeTruthy();

        const mock = httpTestingController.expectOne('http://localhost:8089/products');
        mock.flush([{
            id: 1,
            name: 'hamburguesa',
            price: 500,
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

        let cards = fixture.nativeElement.querySelector('.product-card > .name');
        expect(cards.innerHTML).toEqual('hamburguesa');

        const btnAlmuerzo = fixture.nativeElement.querySelector('#btn-almuerzo');
        const event = new Event('click');
        btnAlmuerzo.dispatchEvent(event);

        fixture.detectChanges();

        cards = fixture.nativeElement.querySelector('.product-card > .name');
        expect(cards.innerHTML).toEqual('tacos');
    }));

    it('when click in product card emits a event with the selected product', (async () => {
        await fixture.whenStable();
        fixture.detectChanges();

        const spineer = fixture.debugElement.nativeElement.querySelector('.spinner-border');
        expect(spineer).toBeTruthy();

        const mock = httpTestingController.expectOne('http://localhost:8089/products');
        mock.flush([{
            id: 1,
            name: 'hamburguesa',
            price: 500,
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
        fixture.componentInstance.selectProduct.subscribe((product: Product) => {
            expect(product.id).toBe(1);
        })
        const card = fixture.nativeElement.querySelector('app-product-card');
        const event = new Event('click');
        card.dispatchEvent(event);
    }));

})

