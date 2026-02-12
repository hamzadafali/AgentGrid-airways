import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FlightService } from '../../../core/services/flight.service';
import { Flight } from '../../../core/models';
import { FlightListComponent } from '../flight-list/flight-list.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    FlightListComponent
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  searchForm!: FormGroup;
  flights: Flight[] = [];
  searched = false;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['']
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const formValue = this.searchForm.value;
      const searchParams = {
        origin: formValue.origin,
        destination: formValue.destination,
        start: formValue.departureDate ? formValue.departureDate.toISOString() : undefined,
        end: formValue.returnDate ? formValue.returnDate.toISOString() : undefined
      };

      this.flightService.searchFlights(searchParams).subscribe({
        next: (flights) => {
          this.flights = flights;
          this.searched = true;
        },
        error: (error) => {
          console.error('Error searching flights:', error);
          this.flights = [];
          this.searched = true;
        }
      });
    }
  }

  onFlightSelect(flight: Flight): void {
    this.router.navigate(['/booking', 'new'], { state: { flight } });
  }
}
