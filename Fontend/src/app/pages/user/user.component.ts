import { Component } from '@angular/core';
import { User } from 'src/app/interface/auth';
import { UserService } from 'src/app/service/user.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user!: User[]
  searchValue: any
  isShown: boolean = true
  allUsers!: User[]
  //  listmist + page
  page: number = 1
  tabSize: number = 8
  tabSizes: any[] = [2, 4, 6, 8, 1000]
  count: number = 0

  constructor(
    private UserService: UserService,
    private router: Router,
  ) {
    this.UserService.getUsers().subscribe((response: any) => {
      console.log(response.data)
      this.user = response.data
      this.allUsers = response.data
    })
  }
  //  limit_page
  onHandleSubmit() {
    this.UserService.getUsers().subscribe((response: any) => {
      console.log(response.data)
      this.user = response.data
      this.allUsers = response.data
    }
    )
  }
  onHandleLimit(event: any) {
    this.tabSize = event.target.value;
    console.log(event.target.value)
    this.page = 1
    this.onHandleSubmit()
    // console.log(this.onHandleSubmit());

  }

  onHandlesPage(event: any) {
    this.page = event;
    this.onHandleSubmit()

  }
  Remove(_id: any) {
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
        this.UserService.deleteUser(_id).subscribe(() => {
          this.user = this.user.filter(item => item._id !== _id)
        })
        Swal.fire(
          'Deleted!',
          'User đã được xóa',
          'success'
        )
      }
    })
  }
  ngOnInit() {
    this.onSearch();


  }

  onSearch() {
    // console.log(`user:`, this.searchValue)
    this.isShown = true;
    if (this.searchValue === "") {
      this.user = this.allUsers;
    } else {
      this.UserService.getUsers().subscribe((response: any) => {
        this.user = response.data.filter((user: any) => {
          return user.name.toLowerCase().includes(this.searchValue == "" ? null : this.searchValue.toLowerCase())
            || user.email.toLowerCase().includes(this.searchValue == "" ? null : this.searchValue.toLowerCase());
        })
      })
    }

  }


  onClickOutside() {
    this.isShown = false;
  }


  onClick(item: User) {
    this.isShown = !this.isShown;
    this.router.navigate(['/product', item._id]).then(() => {
      window.location.reload();
    });
  }

}
