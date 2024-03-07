import { ComponentFixture, TestBed, fakeAsync, flush, 
   // flushMicrotasks
 } from '@angular/core/testing';
import { OrderDetailComponent } from './order-detail.component';
import { CalculateTotalPipe } from '../../pipes/calculate-total.pipe';
import { skip } from 'rxjs/operators';


describe('OrderDetailComponent', () => {
    let fixture: ComponentFixture<OrderDetailComponent>;
    let component:OrderDetailComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OrderDetailComponent, CalculateTotalPipe],
        });
        fixture = TestBed.createComponent(OrderDetailComponent);
        component = fixture.componentInstance;
    });


    it('if the componente received an empty order must shows the inputs without value the button to send disabled and show a placeholder message to add items', async () => {
        component.order = {
            customer:'',
            table:0,
            items:{},
          }
        await fixture.whenStable();
        fixture.detectChanges();

        const placeholderElement = fixture.nativeElement.querySelector('.placeholder');
        expect(placeholderElement.innerHTML).toEqual('- Agregue productos a su orden - ');

        const btnElement = fixture.nativeElement.querySelector('.btnSend');
        expect(btnElement.disabled).toBeTrue();

        const nameInputElement = fixture.nativeElement.querySelector('#clientName');
        expect(nameInputElement.value).toBe('');

        const tableInputElement = fixture.nativeElement.querySelector('#mesa');
        expect(tableInputElement.value).toBe('');

    });

    it('if the user change the inputs the component should emit a order with the nuew values',  fakeAsync(async () => {
        const newOrder = {
            customer:'',
            table:0,
            items:{},
          }
        component.order = newOrder
        fixture.detectChanges();

        component.orderChangeEmiter.pipe(skip(1)).subscribe(updatedOrder => {
            expect(updatedOrder).toEqual({...newOrder, customer: 'Carlos', table: 5});
        })

        const nameInputElement = fixture.nativeElement.querySelector('#clientName');
        expect(nameInputElement.value).toBe('');

        nameInputElement.value = 'Carlos';
        nameInputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        const tableInputElement = fixture.nativeElement.querySelector('#mesa');

        tableInputElement.value = 5;
        tableInputElement.dispatchEvent(new Event('change'));
        fixture.detectChanges();
        flush()

    }));

})




