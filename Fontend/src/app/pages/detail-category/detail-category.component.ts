import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../service/category.service';
import { ICategory } from 'src/app/interface/category';
import { ProductService } from '../../service/product.service';
import { IProduct } from 'src/app/interface/product';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})
export class DetailCategoryComponent {
  category!: ICategory;
  products!: any;
  product!: any
  test: any[] = []

  constructor(
    private router: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    const id = this.router.snapshot.paramMap.get('id');
    this.categoryService.getproductByCategory(id!).subscribe(response => {
      this.products = response;
      for (let id of this.products.products) {
        this.productService.getProduct(id).subscribe((response: any) => {
          this.test.push(response.data);
        });
      }
      console.log(this.test);
    });
  }
}

