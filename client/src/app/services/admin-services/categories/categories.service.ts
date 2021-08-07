import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { API_KEY } from '../../../utils/utils';
import { Category } from "../../../models/model";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  onUpdateOrCreate = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_KEY}/categories`)
  }

  deleteCategory(category: Category): Observable<any> {
    return this.http.delete(`${API_KEY}/categories/${category.id}`);
  }

  addOrSaveCategory(category: Category) {
    if(category.id)
      return this.http.put(`${API_KEY}/categories/${category.id}`, {
        name: category.name
      }).subscribe(() => {
        this.onUpdateOrCreate.emit();
      });

   return this.http.post(`${API_KEY}/categories`, {
      name: category.name
    }).subscribe(() => {
     this.onUpdateOrCreate.emit();
   });
  }
}
