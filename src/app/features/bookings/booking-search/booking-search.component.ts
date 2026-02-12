import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../../../core/models';
import { BookingService } from '../../../core/services/booking.service';
import { BookingDetailsComponent } from '../booking-details/booking-details.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-booking-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BookingDetailsComponent
  ],
  templateUrl: './booking-search.component.html',
  styleUrls: ['./booking-search.component.scss']
})
export class BookingSearchComponent {
  searchForm: FormGroup;
  booking?: Booking;
  searched = false;
  notFound = false;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.searchForm = this.fb.group({
      reference: ['', [Validators.required]]
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      const reference = this.searchForm.value.reference;
      this.bookingService.getBookingByReference(reference)
        .pipe(catchError(() => {
          this.notFound = true;
          return of(null);
        }))
        .subscribe(booking => {
          this.searched = true;
          if (booking) {
            this.booking = booking;
            this.notFound = false;
          }
        });
    }
  }

  onBookingCancelled(): void {
    this.booking = undefined;
    this.searched = false;
    this.notFound = false;
    this.searchForm.reset();
  }
}
