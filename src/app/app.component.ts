import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataState } from './enum/data-state.enum';
import { AppState } from './interface/app-state';
import { FizzBuzzResponse } from './interface/fizzbuzz';
import { FizzbuzzService } from './service/fizzbuzz.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appState$: Observable<AppState<FizzBuzzResponse>>;
  readonly DataState = DataState;

  checkoutForm = this.formBuilder.group({
    min: '',
    max: ''
  });

  constructor(private fizzBuzzService: FizzbuzzService,
              private formBuilder: FormBuilder,){}

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process checkout data here
    const min: number = this.checkoutForm.value.min;
    const max: number = this.checkoutForm.value.max;
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.fizzBuzzService.sendFizzBuzz(min, max)
    .subscribe(
      data => successAlertBox(data),
      error => console.error('Error!', error)
    )
    this.checkoutForm.reset();
  }
}
async function successAlertBox(data: FizzBuzzResponse) {
  Swal.fire({
    title: 'Response',
    html:
    '<h4>Code: </h4> <p>'+data.code+'</p>' +
    '<h4>Timestamp: </h4> <p>'+data.timestamp+'</p>' +
    '<h4>Descripción: </h4> <p>'+data.description+'</p>' +
    '<h4>List: </h4><p>'+data.list+'</p>',
    focusConfirm: false,
  })
  /*
  Swal.fire('Code: '+data.code +"\n" +
   "Timestamp: " + data.timestamp + "\n" +
   "Description: " + data.description + "\n" +
   "List: "+data.list)
   */
}

