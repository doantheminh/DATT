import { Injectable } from '@angular/core';
import { HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {

  constructor() { }

  getToCart() {
    const cartJson = sessionStorage.getItem('carts');

    if (cartJson) {
      return JSON.parse(cartJson)
    } else {
      return []
    }
  }

  saveCart(carts: any) {
    const cratJson = JSON.stringify(carts)
    sessionStorage.setItem('carts', cratJson)
  }

  getAllPrice() {
    const carts = this.getToCart()
    let total: number = 0
    carts.forEach((item: any) => {
      total += item.quantity * item.price
    })
    return total
  }
}
