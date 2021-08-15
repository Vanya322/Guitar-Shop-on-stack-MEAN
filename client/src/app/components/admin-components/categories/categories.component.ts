import { Component, OnInit } from '@angular/core';
import { Category } from "../../../models/category.model";
import { CategoriesService } from "../../../services/admin-services/categories/categories.service";
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

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
      private dialog: MatDialog,
  ) {
    categoriesService.onUpdateOrCreate
      .subscribe(() => {
        this.getCategories();
      })
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.loadingCategory = true;
    this.categoriesService.getCategories()
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

  openAddEditDialog(category: Category) {
    this.dialog.open(CategoryDialogComponent, {
      data: {
        category,
      },
    });
  }

}
