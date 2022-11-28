import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {addedProducts, addProducts, loadProducts} from "../../../state/actions/products.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {Observable} from "rxjs";
import {selectAddedProduct, selectAdding, selectLoading} from "../../../state/selectors/products.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent implements OnInit {
  adding$: Observable<boolean> = new Observable();
  productsForm!: FormGroup;
  @Output() productClosePanel = new EventEmitter();
  @Input() productToEdit!: any;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router:Router
     ) {
  }

  onSubmit(): void {
    this.store.dispatch(addProducts(this.productsForm.value))

  }

  onCancel() {
    this.productsForm.reset();
  }


  ngOnInit(): void {
    this.adding$ = this.store.select(selectAdding);
 this.store.select(selectAddedProduct).subscribe(addedProducts=>{
   if(addedProducts)this.router.navigateByUrl('/products')
 });
    this.productsForm = this.fb.group({
      name: ["", Validators.required],
      serial_number: [""],
        price: [100],
    });

    if (this.productToEdit) {
      // this.profileService
      //   .getLoyaltyByIdToEdit(this.loyaltyToEdit.id)
      //   .subscribe((response) => {
      //     this.productsForm.patchValue(response.result);
      //   });
    }
  }

}
