import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastrHandlerService {

  constructor(private toastrService: ToastrService) {}

  successToaster(msg: string) {
    this.toastrService.success(msg);
  }

  errorToaster( msg: string) {
    this.toastrService.error(msg);
  }
}
