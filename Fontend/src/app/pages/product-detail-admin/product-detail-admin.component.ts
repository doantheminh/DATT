import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail-admin',
  templateUrl: './product-detail-admin.component.html',
  styleUrls: ['./product-detail-admin.component.scss']
})
export class ProductDetailAdminComponent {
  product!: IProduct;
  categoryName!: string;

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe((response: any) => {
        this.product = response.data;
        this.categoryName = response.data.categoryId.name;
      });
    }

  }
}
