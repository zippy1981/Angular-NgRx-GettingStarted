import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  productSelectedSub: Subscription;
  productsStateSub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.productSelectedSub = this.productService.selectedProductChanges$.subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );

    this.productService.getProducts().subscribe(
      (products: Product[]) => this.products = products,
      (err: any) => this.errorMessage = err.error
    );

    this.productsStateSub = this.store.pipe(select('products'))
      .subscribe(products => {
        if (products) {
          console.log(`Show product Code: ${products.showProductCode}`);
          this.displayCode = products.showProductCode;
        } else {
          console.debug('No Products state');
        }
      });
  }

  ngOnDestroy(): void {
    this.productSelectedSub.unsubscribe();
    this.productsStateSub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch({
      type: 'TOGGLE_PRODUCT_CODE',
      payload: value
    });
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
