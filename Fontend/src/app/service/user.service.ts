import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/user`);
  }

  getUser(id: string | null): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/User/${id}`);
  }
  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/User/${user._id}`, user);
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.API_URL}/User/${id}`);
  }
}
