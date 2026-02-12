import { Pipe, PipeTransform } from '@angular/core';
import { FlightStatus } from '../../core/models/flight.model';
import { BookingStatus } from '../../core/models/booking.model';
import { PaymentStatus } from '../../core/models/payment.model';

@Pipe({
  name: 'status',
  standalone: true
})
export class StatusPipe implements PipeTransform {
  transform(value: FlightStatus | BookingStatus | PaymentStatus): string {
    const translations: Record<string, string> = {
      'SCHEDULED': 'Programmé',
      'DELAYED': 'Retardé',
      'CANCELLED': 'Annulé',
      'COMPLETED': 'Terminé',
      'PENDING': 'En attente',
      'CONFIRMED': 'Confirmé',
      'FAILED': 'Échoué'
    };

    return translations[value] || value;
  }
}
