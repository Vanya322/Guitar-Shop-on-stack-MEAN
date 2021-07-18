import { Component, OnInit } from '@angular/core';
import { Category } from "../../../models/model";
import { CategoriesService } from "../../../services/admin-services/categories/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  displayedColumns: string[] = ['name', 'actions'];
  loadingCategory: boolean = false;

  constructor(
      private categoriesService: CategoriesService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.loadingCategory = true;
    this.categoriesService.getCategory()
      .subscribe((categories: Category[]) => {
        this.categories = [...categories];
        this.loadingCategory = false;
      });
  }

  deleteCategory(category: Category) {
    this.loadingCategory = true;
    this.categoriesService.deleteCategory(category)
        .subscribe(() => {
          this.getCategories();
          this.loadingCategory = false;
        });
  }

}
