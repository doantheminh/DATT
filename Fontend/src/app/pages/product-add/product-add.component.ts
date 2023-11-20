import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {

  categorys!: any;

  productAddForm = this.formBuilder.group({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    priceSale: new FormControl(0),
    describe: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
    images: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),
    categoryId: new FormControl('', Validators.required),

  })

  get checkForm() { return this.productAddForm.controls }
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService, private router: Router) {
    this.productService.getCategory().subscribe(response => {
      console.log(response.data);
      this.categorys = response.data


    })

  }

  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
    const file_data = this.files[0]
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'upload');
    data.append('cloud_name', 'doa7mkkpq');
    this.productService.uploadImage(data,
    ).subscribe(response => {
      this.url.push(response.secure_url)
      console.log(this.url);
    }
    )
  }

  files: any[] = [];
  url: any = []
  onRemovem(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);

  }




  onHandleSubmit() {

    const product: IProduct = {
      name: this.productAddForm.value.name || "",
      price: this.productAddForm.value.price || 0,
      priceSale: this.productAddForm.value.priceSale || 0,
      describe: this.productAddForm.value.describe || "",
      images: this.url[0] || "",
      status: this.productAddForm.value.status || true,
      categoryId: this.productAddForm.value.categoryId || ""

    }

    this.productService.addProduct(product).subscribe(response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Product success',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['admin/product'])
    }, (error) => {
      alert("Thêm không thành công")
    }

    )


  }
}
