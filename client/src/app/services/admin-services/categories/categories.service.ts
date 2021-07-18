import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_KEY } from '../../../utils/utils';
import { Category } from "../../../models/model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_KEY}/categories`);
  }

  deleteCategory(category: Category): Observable<any> {
    return this.http.delete(`${API_KEY}/categories/${category.id}`);
  }
}
