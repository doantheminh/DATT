import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { AddToCartService } from 'src/app/service/add-to-cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category-use',
  templateUrl: './list-category-use.component.html',
  styleUrls: ['./list-category-use.component.scss']
})
export class ListCategoryUseComponent {
  category: ICategory[] = [];
  products!: any;
  product!: any
  test: any[] = []
  carts: any = this.cartService.getToCart()
  

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: AddToCartService,
    private routers: Router
    
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    this.categoryService.getproductByCategory(id!).subscribe(response => {
      this.products = response;
      for (let id of this.products.products) {
        this.productService.getProduct(id).subscribe((response: any) => {
          this.test.push(response.data);
        });
      }
    });
    this.categoryService.getCategoryAll().subscribe((response:any) => {
      this.category = response.data;
      console.log(this.category);
    });
    
    
    
    
  }

  formatCurrency(value: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    });

    return formatter.format(value);
  }

  addToCart(item: any) {

    const index = this.carts.findIndex((i: any) => {
      return i._id === item._id
    })
    if (index >= 0) {
      this.carts[parseInt(index)].quantity += 1
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

  onCategoryClick(_id: any) {
    this.routers.navigate(['/categorys/', _id]).then(() => {
      window.location.reload();
    });
  }

}
