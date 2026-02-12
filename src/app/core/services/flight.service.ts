import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Flight, FlightSearchParams } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = `${environment.apiUrl}/flights`;

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  searchFlights(params: FlightSearchParams): Observable<Flight[]> {
    let httpParams = new HttpParams()
      .set('origin', params.origin)
      .set('destination', params.destination);

    if (params.start) {
      httpParams = httpParams.set('start', params.start);
    }
    if (params.end) {
      httpParams = httpParams.set('end', params.end);
    }

    return this.http.get<Flight[]>(`${this.apiUrl}/search`, { params: httpParams });
  }

  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }

  createFlight(flight: Partial<Flight>): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flight);
  }
}
