import { Component } from '@angular/core';

import { Router } from '@angular/router';


@Component({
  selector: 'app-base-layout-admin',
  templateUrl: './base-layout-admin.component.html',
  styleUrls: ['./base-layout-admin.component.scss']
})
export class BaseLayoutAdminComponent {

  userName = localStorage.getItem('userName');
  role = localStorage.getItem('role');
  email = localStorage.getItem('email');
  showAdmin = true;

  constructor(private router: Router) {
    console.log(this.role);
  }








  logout() {
    if (confirm('Bạn có muốn đăng xuất không ?')) {
      this.showAdmin = false;
      // Xóa token khỏi local storage
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');


      this.userName = null;
      this.role = null;

      this.router.navigate(['/signin']);
    }
  }

}

