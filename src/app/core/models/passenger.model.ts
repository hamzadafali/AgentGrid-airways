export interface Passenger {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passportNumber: string;
  dateOfBirth: string;
}

export interface CreatePassengerDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passportNumber: string;
  dateOfBirth: string;
}
