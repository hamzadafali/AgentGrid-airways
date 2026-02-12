export type FlightStatus = 'SCHEDULED' | 'DELAYED' | 'CANCELLED' | 'COMPLETED';

export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureDateTime: string;
  arrivalDateTime: string;
  totalSeats: number;
  availableSeats: number;
  price: number;
  status: FlightStatus;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  start?: string;
  end?: string;
}
