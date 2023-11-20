import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interface/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent {
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
