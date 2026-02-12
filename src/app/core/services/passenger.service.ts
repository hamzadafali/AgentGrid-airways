import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Passenger, CreatePassengerDto } from '../models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiUrl = `${environment.apiUrl}/passengers`;

  constructor(private http: HttpClient) {}

  getAllPassengers(): Observable<Passenger[]> {
    return this.http.get<Passenger[]>(this.apiUrl);
  }

  getPassengerById(id: number): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiUrl}/${id}`);
  }

  getPassengerByEmail(email: string): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiUrl}/email/${email}`);
  }

  getPassengerByPassport(passport: string): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.apiUrl}/passport/${passport}`);
  }

  createPassenger(passenger: CreatePassengerDto): Observable<Passenger> {
    return this.http.post<Passenger>(this.apiUrl, passenger);
  }

  deletePassenger(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
