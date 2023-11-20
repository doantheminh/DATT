import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { FavouriteService } from 'src/app/service/favourite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent {
  carts: any = this.cartService.getToCart()
  index!: any
  favourites: any[] = []
  id = localStorage.getItem('id');
  product_id: any;
  isProductInWishlist: boolean = false;
  constructor(
    private router: ActivatedRoute,
    private favouriteService: FavouriteService,
    private cartService: AddToCartService,

  ) {
    this.product_id = this.router.snapshot.paramMap.get('id');
    this.checkProductInWishlist();
    this.getData()
  }

  getData() {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.favouriteService.getWishlist(id).subscribe((response: any) => {
        for (let products of response.wishlist_items) {
          // console.log(products.product_id);
          this.favourites.push(products.product_id)
        }
        console.log(this.favourites);
      });
    }
  }

  checkProductInWishlist() {
    this.favouriteService.checkProductInWishlist(this.id, this.product_id)
      .subscribe((result: any) => {
        this.isProductInWishlist = result.isProductInWishlist;
      });
  }

  removeProductFromWishlist(user_id: string, product_id: string) {
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
        this.favouriteService.removeProductFromWishlist(user_id, product_id)
          .subscribe(() => {
            this.favourites = this.favourites.filter((item: any) => item._id !== product_id!)
          }
          )
        Swal.fire(
          'Deleted!',
          'Sản phẩm đã được xóa',
          'success'
        )
      }
    })
  }

  addToCart(item: any) {
    this.index = this.carts.findIndex((i: any) => {
      return i._id === item._id
    })
    if (this.index >= 0) {
      this.carts[parseInt(this.index)].quantity += 1
    } else {
      const cartItem: any = {
        _id: item._id,
        name: item.name,
        images: item.images,
        price: item.priceSale ? item.priceSale : item.price,
        quantity: 1,
        subtotal: function () {
          return this.price * this.quantity
        }
      }
      this.carts.push(cartItem)

    }

    this.cartService.saveCart(this.carts)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Add to Cart success',
      showConfirmButton: false,
      timer: 1500
    })
  }
}


