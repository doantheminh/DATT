import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from "@angular/forms"
import { ProductService } from 'src/app/service/product.service';
import { IProduct } from 'src/app/interface/product';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-base-layout-user',
  templateUrl: './base-layout-user.component.html',
  styleUrls: ['./base-layout-user.component.scss']
})
export class BaseLayoutUserComponent {
  searchValue: any
  isShown: boolean = true
  products!: IProduct[]
  constructor(private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }
  userName = localStorage.getItem('userName');
  role = localStorage.getItem('role');
  id = localStorage.getItem('id');
  showAdmin = true;
  logout() {

    Swal.fire({
      title: 'Đăng xuất',
      text: "Bạn chắc là muốn Đăng xuất chứ ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showAdmin = false;
        // Xóa token khỏi local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        localStorage.removeItem('email');

        this.userName = null;
        this.role = null;
        Swal.fire(
          'Đăng xuất!',
          'Đăng xuất Success',
          'success'
        )
      }
    })


  }

  ngOnInit() {
    this.onSearch();


  }

  onSearch() {
    console.log(`product:`, this.searchValue)
    this.isShown = true;
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response.data.filter((product: any) => {
        console.log(product.name.includes(this.searchValue));
        return product.name.toLowerCase().includes(this.searchValue == "" ? null : this.searchValue.toLowerCase())
      })
    })

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
}
