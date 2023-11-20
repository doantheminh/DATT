import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interface/category';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent {
  formCategory = this.formBuilder.group({
    name: new FormControl('', Validators.required),
  })

  get checkCategory() {
    return this.formCategory.controls
  }
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) {
  }

  onhandelSubmit() {

    const category: ICategory = {
      name: this.formCategory.value.name || ""
    }

    this.categoryService.categoryAdd(category).subscribe(data => {
      console.log(data);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add CateGory success',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(['admin/category'])

    },
      (error) => {
        alert('Thêm danh mục thất bại');
      })


  }

}
