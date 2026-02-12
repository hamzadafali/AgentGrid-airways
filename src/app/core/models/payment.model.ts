import { Booking } from './booking.model';

export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface Payment {
  id: number;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  status: PaymentStatus;
  booking: Booking;
}

export interface CreatePaymentDto {
  bookingId: number;
  amount: number;
  method: PaymentMethod;
}
