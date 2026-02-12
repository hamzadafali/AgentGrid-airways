import { Flight } from './flight.model';
import { Passenger } from './passenger.model';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

export interface Booking {
  id: number;
  bookingReference: string;
  seatNumber: string;
  bookingDate: string;
  status: BookingStatus;
  flight: Flight;
  passenger: Passenger;
}

export interface CreateBookingDto {
  flightId: number;
  passengerId: number;
  seatNumber: string;
}
