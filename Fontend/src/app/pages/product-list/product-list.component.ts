import { Component } from '@angular/core';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  products!: IProduct[]
  isShown: boolean = true
  searchValue: any
  allProducts!: IProduct[];
  // limt +Page
  page: number = 1;
  tabSize: number = 8;
  tabSizes: number[] = [4, 6, 8, 10, 100]
  count: number = 0

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.productService.getProducts().subscribe((response: any) => {
      console.log(response.data);
      this.products = response.data
      this.allProducts = response.data
    }
    )
  }
  //  limit_page
  onHandleSubmit() {
    this.productService.getProducts().subscribe((response: any) => {
      console.log(response.data)
      this.products = response.data
      this.allProducts = response.data
    }
    )
  }
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    this.page = 1
    this.onHandleSubmit()
    console.log(this.onHandleSubmit());

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }

  removeId(_id: any) {
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
        this.productService.deleteProduct(_id).subscribe(() => {
          this.products = this.products.filter(product => product._id !== _id)
        })
        Swal.fire(
          'Deleted!',
          'Sản phẩm đã được xóa',
          'success'
        )
      }
    })

  }


  onSearch() {
    console.log(`product:`, this.searchValue)
    this.isShown = true;
    if (this.searchValue === "") {
      this.products = this.allProducts
    } else {
      this.productService.getProducts().subscribe((response: any) => {
        this.products = response.data.filter((product: any) => {
          console.log(product.name.includes(this.searchValue));
          return product.name.toLowerCase().includes(this.searchValue == "" ? null : this.searchValue.toLowerCase())
        })
      })
    }


  }


  onClickOutside() {
    this.isShown = false;
  }


  onClick(item: IProduct) {
    this.isShown = !this.isShown;
    this.router.navigate(['/product', item._id]).then(() => {
      window.location.reload();
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

}
