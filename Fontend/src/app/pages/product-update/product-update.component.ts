// product-update.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent {
  products!: IProduct;
  categorys!: any;
  cate: any

  productAddForm = this.fb.group({
    name: new FormControl('', Validators.required),
    price: new FormControl(0, Validators.required),
    priceSale: new FormControl(0, Validators.required),
    describe: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
    images: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    status: new FormControl(true, Validators.required),

  })
  get checkForm() { return this.productAddForm.controls }
  constructor(private fb: FormBuilder,
    private router: ActivatedRoute,
    private productService: ProductService,
    private route: Router,
  ) {
    this.productService.getCategory().subscribe(response => {
      console.log(response.data);
      this.categorys = response.data
    })



    this.router.paramMap.subscribe(params => {
      const _id = params.get('id');
      this.productService.getProduct(_id).subscribe((response: any) => {
        console.log(response);
        this.products = response.data
        console.log(this.products);
        this.cate = response.data.categoryId.name
        this.productAddForm.patchValue({
          name: response.data.name,
          price: response.data.price,
          priceSale: response.data.priceSale,
          describe: response.data.describe,
          categoryId: response.data.categoryId,
          images: response.data.images,
          status: response.data.status
        })
      })
    });

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

    const products: any = {
      _id: this.products._id,
      name: this.productAddForm.value.name || '',
      price: this.productAddForm.value.price || 0,
      priceSale: this.productAddForm.value.priceSale || 0,
      describe: this.productAddForm.value.describe || '',
      categoryId: this.productAddForm.value.categoryId || '',
      images: this.url[0] || "",
      status: this.productAddForm.value.status || true
    };

    console.log(products._id);
    this.productService.updateProduct(products).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Product success',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(['/admin/product'])
    },
      (error) => {
        alert('Cập nhật mục thất bại');
      });

  }

}
