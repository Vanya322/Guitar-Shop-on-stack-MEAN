import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from "../../../../models/category.model";
import { FormControl, FormGroup } from '@angular/forms'
import { CategoriesService } from '../../../../services/admin-services/categories/categories.service'

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  category: FormGroup = new FormGroup({
    id: new FormControl(this.data.category.id),
    name: new FormControl(this.data.category.name),
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      category: Category,
    },
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
  }

  addOrSaveCategory() {
    this.categoriesService.addOrSaveCategory(this.category.value)
  }

}
