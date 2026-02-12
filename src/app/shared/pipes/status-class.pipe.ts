import { Pipe, PipeTransform } from '@angular/core';
import { FlightStatus } from '../../core/models/flight.model';
import { BookingStatus } from '../../core/models/booking.model';
import { PaymentStatus } from '../../core/models/payment.model';

@Pipe({
  name: 'statusClass',
  standalone: true
})
export class StatusClassPipe implements PipeTransform {
  transform(value: FlightStatus | BookingStatus | PaymentStatus): string {
    const classMap: Record<string, string> = {
      'SCHEDULED': 'scheduled',
      'DELAYED': 'delayed',
      'CANCELLED': 'cancelled',
      'COMPLETED': 'completed',
      'PENDING': 'pending',
      'CONFIRMED': 'confirmed',
      'FAILED': 'cancelled'
    };

    return `status-badge ${classMap[value] || ''}`;
  }
}
