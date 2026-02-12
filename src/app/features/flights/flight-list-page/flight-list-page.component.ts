import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FlightService } from '../../../core/services/flight.service';
import { Flight } from '../../../core/models';
import { FlightListComponent } from '../flight-list/flight-list.component';

@Component({
  selector: 'app-flight-list-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FlightListComponent
  ],
  templateUrl: './flight-list-page.component.html',
  styleUrls: ['./flight-list-page.component.scss']
})
export class FlightListPageComponent implements OnInit {
  flights: Flight[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private flightService: FlightService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  loadFlights(): void {
    this.loading = true;
    this.errorMessage = '';
    console.log('Starting to load flights from:', this.flightService);

    this.flightService.getAllFlights().subscribe({
      next: (flights) => {
        console.log('Flights loaded successfully:', flights);
        this.flights = flights;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading flights:', error);
        console.error('Error details:', error.message, error.status);
        this.errorMessage = 'Impossible de charger les vols pour le moment.';
        this.flights = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onFlightSelect(flight: Flight): void {
    this.router.navigate(['/booking', 'new'], { state: { flight } });
  }
}
