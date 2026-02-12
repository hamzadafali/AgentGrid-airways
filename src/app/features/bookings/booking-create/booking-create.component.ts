import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Flight, Passenger, Booking } from '../../../core/models';
import { BookingService } from '../../../core/services/booking.service';
import { PassengerFormComponent } from '../../passengers/passenger-form/passenger-form.component';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { StatusClassPipe } from '../../../shared/pipes/status-class.pipe';

@Component({
  selector: 'app-booking-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PassengerFormComponent,
    StatusPipe,
    StatusClassPipe
  ],
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent implements OnInit {
  selectedFlight?: Flight;
  selectedPassenger?: Passenger;
  seatForm!: FormGroup;
  createdBooking?: Booking;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedFlight = navigation.extras.state['flight'];
    }
  }

  ngOnInit(): void {
    if (!this.selectedFlight) {
      this.router.navigate(['/']);
      return;
    }

    this.seatForm = this.fb.group({
      seatNumber: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]{2,4}$/)]]
    });
  }

  onPassengerSubmit(passenger: Passenger): void {
    this.selectedPassenger = passenger;
  }

  onConfirmBooking(): void {
    if (this.selectedFlight && this.selectedPassenger && this.seatForm.valid) {
      const bookingDto = {
        flightId: this.selectedFlight.id,
        passengerId: this.selectedPassenger.id,
        seatNumber: this.seatForm.value.seatNumber
      };

      this.bookingService.createBooking(bookingDto).subscribe({
        next: (booking) => {
          this.createdBooking = booking;
          this.snackBar.open('Réservation créée avec succès!', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Error creating booking:', error);
        }
      });
    }
  }

  proceedToPayment(): void {
    if (this.createdBooking) {
      this.router.navigate(['/payment'], { state: { booking: this.createdBooking } });
    }
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
