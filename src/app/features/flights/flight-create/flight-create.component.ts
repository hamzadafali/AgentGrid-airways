import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FlightService } from '../../../core/services/flight.service';

@Component({
  selector: 'app-flight-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.scss']
})
export class FlightCreateComponent implements OnInit {
  flightForm!: FormGroup;
  statuses = ['SCHEDULED', 'DELAYED', 'CANCELLED', 'COMPLETED'];

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.flightForm = this.fb.group({
      flightNumber: ['', [Validators.required]],
      airline: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      departureDateTime: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      arrivalDateTime: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      totalSeats: ['', [Validators.required, Validators.min(1)]],
      availableSeats: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: ['SCHEDULED', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.flightForm.valid) {
      const formValue = this.flightForm.value;

      // Combine date and time for departure
      const departureDate = new Date(formValue.departureDateTime);
      const [depHour, depMin] = formValue.departureTime.split(':');
      departureDate.setHours(parseInt(depHour), parseInt(depMin));

      // Combine date and time for arrival
      const arrivalDate = new Date(formValue.arrivalDateTime);
      const [arrHour, arrMin] = formValue.arrivalTime.split(':');
      arrivalDate.setHours(parseInt(arrHour), parseInt(arrMin));

      const flight = {
        flightNumber: formValue.flightNumber,
        airline: formValue.airline,
        origin: formValue.origin,
        destination: formValue.destination,
        departureDateTime: departureDate.toISOString(),
        arrivalDateTime: arrivalDate.toISOString(),
        totalSeats: formValue.totalSeats,
        availableSeats: formValue.availableSeats,
        price: formValue.price,
        status: formValue.status
      };

      this.flightService.createFlight(flight).subscribe({
        next: (createdFlight) => {
          this.snackBar.open('Vol créé avec succès!', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating flight:', error);
        }
      });
    }
  }
}
