import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../service/category.service';
import { ICategory } from 'src/app/interface/category';
import { FavouriteService } from 'src/app/service/favourite.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  products!: IProduct[]
  carts: any = this.cartService.getToCart()
  category!: ICategory[]
  allCategory!: ICategory[];
  index!: any
  wishlist: any = {};
  user_id = localStorage.getItem('id');


  page: number = 1
  tabSize: number = 12
  count: number = 0
  constructor(
    private productService: ProductService,
    private cartService: AddToCartService,
    private cate: CategoryService,
    private favouriteService: FavouriteService,
  ) {
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    }
    )
    this.cate.getCategoryAll().subscribe((response: any) => {
      this.category = response.data
      this.allCategory = response.data;

    })

  }

  //  limit_page
  onHandleSubmit() {
    this.cate.getCategoryAll().subscribe((response: any) => {
      console.log(response.data)
      this.category = response.data
      this.allCategory = response.data
    }
    )
  }
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page = 1
    this.onHandleSubmit()
    console.log(this.onHandleSubmit());

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }
  //  cart
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
  // end cart
  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });
    return formatter.format(value);
  }


  addToWishlist(product_id: string): void {
    if (this.user_id === null) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Bạn cần đăng nhập',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      this.favouriteService.addToWishlist(this.user_id, product_id).subscribe(
        wishlist => {
          this.wishlist = wishlist
          console.log(wishlist);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'thêm yêu thích thành công',
            showConfirmButton: false,
            timer: 1500
          })
        },
        error => {
          console.log(error);
        }
      );
    }

  }


}


