import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/shared/models/Product';

@Pipe({
  name: 'calculateTotal',
  pure: false 
})
export class CalculateTotalPipe implements PipeTransform {
  transform(itemList: Item[]): number {    
    const total = itemList.reduce((accumulator, item) => {
      const subtotal = item.product.price * item.qty;
      return accumulator + subtotal;
    }, 0);

    return total;
  }

}