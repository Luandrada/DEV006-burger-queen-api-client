import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateTotal',
  pure: false 
})
export class CalculateTotalPipe implements PipeTransform {
  transform(productList: any[]): number {
    if (!productList) {
      return 0;
    }
    
    const total = productList.reduce((accumulator, item) => {
      const subtotal = item.product.price * item.qty;
      return accumulator + subtotal;
    }, 0);

    return total;
  }
}
