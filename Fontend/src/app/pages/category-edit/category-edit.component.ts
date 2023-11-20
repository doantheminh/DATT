import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/interface/category';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent {
  category!: any;
  formCategory = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  })

  get checkCategory() {
    return this.formCategory.controls
  }
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private categoryDetailService: ActivatedRoute,
    private navige: Router
  ) {
    this.categoryDetailService.paramMap.subscribe(params => {
      const _id = params.get('id')
      this.categoryService.getCategory(_id).subscribe((response => {
        console.log(response);

        this.category = response
        console.log(this.category);

        this.formCategory.patchValue({
          name: response.name,
        })
      }));

    })
  }




  onhandelSubmit() {
    const category: ICategory = {
      _id: this.category._id,
      name: this.formCategory.value.name || ""
    }
    console.log(category)
    this.categoryService.categoryUpdate(category).subscribe(response => {
      console.log(response);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update CateGory success',
        showConfirmButton: false,
        timer: 1500
      })
      this.navige.navigate(['admin/category'])
    },
      (error) => {
        alert('Cập nhật mục thất bại');
      })


  }
}
