import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Booking } from '../../../core/models';
import { BookingService } from '../../../core/services/booking.service';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { StatusClassPipe } from '../../../shared/pipes/status-class.pipe';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    StatusPipe,
    StatusClassPipe
  ],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
  @Input() booking!: Booking;
  @Output() bookingCancelled = new EventEmitter<void>();

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  canCancel(): boolean {
    return this.booking.status === 'CONFIRMED' || this.booking.status === 'PENDING';
  }

  onCancel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Annuler la réservation',
        message: 'Êtes-vous sûr de vouloir annuler cette réservation ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookingService.cancelBooking(this.booking.id).subscribe({
          next: (updatedBooking) => {
            this.booking = updatedBooking;
            this.snackBar.open('Réservation annulée avec succès', 'Fermer', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
            this.bookingCancelled.emit();
          },
          error: (error) => {
            console.error('Error cancelling booking:', error);
          }
        });
      }
    });
  }
}
