import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemList : any = [];
  productList = new BehaviorSubject<any>([]);
  search = new BehaviorSubject<string>('');
  isExist : boolean = false;

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product : any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product : any) {
    this.isExist = false;

    this.cartItemList.map((a:any)=>{
      if (a.id == product.id) {
        a.quantity += 1;
        a.total = a.price * a.quantity;
        this.isExist = true;
      }
    });

    if (!this.isExist) {
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
    }

    this.getTotalPrice();
  }

  addQuantity(product : any){
    product.quantity += 1;
    product.total = product.price * product.quantity;
    this.productList.next(this.cartItemList);    
    this.getTotalPrice();
  }  

  minusQuantity(product : any){
    if (product.quantity == 1) {
      this.removeCartItem(product);
    } else {
      product.quantity -= 1;
      product.total = product.price * product.quantity;
      this.productList.next(this.cartItemList);    
    }
    this.getTotalPrice();
  }

  getTotalPrice() : number {
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  removeCartItem(product : any) {
    this.cartItemList.map((a:any, index:any)=> {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
