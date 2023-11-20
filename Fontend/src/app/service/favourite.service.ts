import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/api';

  addToWishlist(user_id: any, product_id: string): Observable<any> {
    const body = { user_id, product_id };
    return this.http.post(`${this.apiUrl}/favourite`, body);
  }

  getWishlist(user_id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/favourite/${user_id}`);
  }
  removeProductFromWishlist(user_id: string, product_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/favourite/remove/${user_id}/${product_id}`)

  }
  checkProductInWishlist(productId: any, userId: any): Observable<any> {
    return this.http.get(`/wishlist/check/${productId}/user/${userId}`);
  }
}
