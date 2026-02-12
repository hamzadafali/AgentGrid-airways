import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Flight } from '../../../core/models';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { StatusClassPipe } from '../../../shared/pipes/status-class.pipe';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    StatusPipe,
    StatusClassPipe
  ],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent {
  @Input() flights: Flight[] = [];
  @Output() flightSelected = new EventEmitter<Flight>();

  onSelectFlight(flight: Flight): void {
    this.flightSelected.emit(flight);
  }

  getFlightDuration(departure: string, arrival: string): string {
    const diff = new Date(arrival).getTime() - new Date(departure).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }
}
