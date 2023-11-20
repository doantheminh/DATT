import { Component } from '@angular/core';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {

  carts: any = []

  totalPrice: number = this.addToCartService.getAllPrice()

  constructor(private addToCartService: AddToCartService) {
    this.carts = this.addToCartService.getToCart()

  };

  subtotal(cart: any) {
    return cart.quantity * cart.price
  }

  updateQTL(i: number, event: any) {
    let newQuantity = parseInt(event.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    event.target.value = newQuantity;
    this.carts[i].quantity = newQuantity;
    this.addToCartService.saveCart(this.carts)
    this.totalPrice = this.addToCartService.getAllPrice()

  }

  removeCart(i: number) {
    Swal.fire({
      title: 'Delete?',
      text: "Bạn chắc là muốn xóa chứ ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carts.splice(i, 1)
        this.addToCartService.saveCart(this.carts)
        Swal.fire(
          'Deleted!',
          'Sản phẩm đã được xóa',
          'success'
        )
      }
    })
  }

  clearCart() {
    Swal.fire({
      title: 'Delete All?',
      text: "Bạn chắc là muốn xóa tất cả chứ ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.carts = []
        Swal.fire(
          'Deleted!',
          'Sản phẩm đã được xóa',
          'success'
        )
      }
    })

  }
}

