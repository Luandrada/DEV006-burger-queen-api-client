import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | undefined; // editar :  cambiar undefined por un producto modelo vacio 

  constructor() { }

  ngOnInit(): void {}
}
