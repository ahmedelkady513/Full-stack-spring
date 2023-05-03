import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  constructor(private formBuilder: FormBuilder, private shopForm: ShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),

    });

    // populate credit card months
    const startMotnh: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMotnh);

    this.shopForm.getCreditCardMonths(startMotnh).subscribe(
      data => {
        console.log("Retrieved credit card month" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
    // populate credit card years
    this.shopForm.getCreditCardYears().subscribe(
      data => {
        console.log("retrieved credit card years : " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );
  }

  onSubmit() {
  }

  copyShippingAddressToBillingAddress(event: any) {
    if ((event.target as HTMLInputElement).checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }

  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number;

    if(currentYear == selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopForm.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }
}
