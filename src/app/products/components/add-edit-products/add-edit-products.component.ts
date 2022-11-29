import {Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, switchMap, tap} from 'rxjs';

import {addProducts, updateProducts,} from '@app/state/actions/products.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@app/state/app.state';
import {selectAdding, selectListProducts,} from '@app/state/selectors/products.selectors';

import {SubSink} from 'subsink';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss'],
})
export class AddEditProductsComponent implements OnInit, OnDestroy {
  adding$: Observable<boolean> = new Observable();
  productsForm!: FormGroup;
  @Output() productClosePanel = new EventEmitter();
  @Input() productToEdit!: any;
  private subs = new SubSink();
  id: any;
  editMode = false;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onSubmit(): void {
    this.router.navigateByUrl('/products');
    if (this.id=='-1')
      this.store.dispatch(addProducts(this.productsForm.value));
    else
      this.store.dispatch(
        updateProducts({ ...this.productsForm.value, id: this.id })
      );
  }

  onCancel() {
    this.productsForm.reset();
  }

  ngOnInit(): void {
    // Validators.pattern(/([A-Za-z0-9]+)/),Validators.maxLength(20)
    this.productsForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5),Validators.pattern(/([A-Za-z0-9]+)/),Validators.maxLength(20)])],
      serial_number: ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern(/([A-Za-z0-9]+)/),Validators.maxLength(8)])],
      price: [100, Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(3)])],

    });
    this.adding$ = this.store.select(selectAdding);

    let fetchData$ = this.route.paramMap.pipe(
      tap((params) => {
        this.id = params.get('id');
      }),
      switchMap((params) => {
        return this.store.select(selectListProducts);
      })
    );
    this.subs.sink = fetchData$.subscribe((data) => {
      if (data) {
       // this.editMode = true;
        this.productsForm.patchValue(data.filter((_) => _.id == this.id)[0]);
      }
    });
  }

  public errorHandling = (control: string, error: string) => {
    // @ts-ignore
    if(Object.keys(this.productsForm.controls[control].errors).length>0)
    {
      switch (error) {

      }
    }

  }


  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
