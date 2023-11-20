import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from 'rxjs';
import { Signin, User } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  signup(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signup`, user)
  }

  signin(user: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/signin`, user)
  }

}
