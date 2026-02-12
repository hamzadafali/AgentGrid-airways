import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Booking, Payment, PaymentMethod } from '../../../core/models';
import { PaymentService } from '../../../core/services/payment.service';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { StatusClassPipe } from '../../../shared/pipes/status-class.pipe';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    StatusPipe,
    StatusClassPipe
  ],
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;
  booking?: Booking;
  payment?: Payment;

  paymentMethods: PaymentMethod[] = ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL'];

  paymentMethodLabels: Record<PaymentMethod, string> = {
    'CREDIT_CARD': 'Carte de crédit',
    'DEBIT_CARD': 'Carte de débit',
    'PAYPAL': 'PayPal'
  };

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.booking = navigation.extras.state['booking'];
    }
  }

  ngOnInit(): void {
    if (!this.booking) {
      this.router.navigate(['/']);
      return;
    }

    this.paymentForm = this.fb.group({
      amount: [{ value: this.booking.flight.price, disabled: true }, [Validators.required]],
      method: ['CREDIT_CARD', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid && this.booking) {
      const paymentDto = {
        bookingId: this.booking.id,
        amount: this.booking.flight.price,
        method: this.paymentForm.value.method
      };

      this.paymentService.createPayment(paymentDto).subscribe({
        next: (payment) => {
          this.payment = payment;
          this.snackBar.open('Paiement traité avec succès!', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Error processing payment:', error);
        }
      });
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToBooking(): void {
    if (this.booking) {
      this.router.navigate(['/booking/search']);
    }
  }
}
