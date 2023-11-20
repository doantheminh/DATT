import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from 'src/app/interface/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent {


  loginForm = this.fb.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8)])),
  });

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }
  get checkValidate() {
    return this.loginForm.controls
  }
  onSubmit() {

    if (this.loginForm.valid) {
      const signinData: User = {
        email: this.loginForm.value.email || '',
        password: this.loginForm.value.password || ''
      };
      this.authService.signin(signinData).subscribe(
        (data: any) => {
          // console.log(data.user.email);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('role', data.user.role);
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('id', data.user._id);
          localStorage.setItem('token', data.token);
          let token = localStorage.getItem('token');
          console.log(token);
          if (data.user.role === "admin") {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login Admin success',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/']);

          } else {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login success',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['/'])
          }

        },
        (error) => {
          alert('Đăng nhập thất bại');
        }
      );
    }
  }

}
