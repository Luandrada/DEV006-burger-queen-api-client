import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/@core/services/product.service';
import { Product } from 'src/app/shared/interfaces/Product';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  products: Array<Product> | undefined 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((resp)=> {
      this.products = resp
      console.log(resp)
    })
  }
}
