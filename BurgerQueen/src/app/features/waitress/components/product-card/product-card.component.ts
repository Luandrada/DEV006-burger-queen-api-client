import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

const placeholderProd: Product = {
  id: 0,
  name: "Agua",
  price: 2,
  image: "",
  type: "Desayuno"
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})

export class ProductCardComponent implements OnInit {
  
  @Input() product: Product = placeholderProd;
  constructor() { }

  ngOnInit(): void {}
}
