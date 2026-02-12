import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/flights/search',
    pathMatch: 'full'
  },
  {
    path: 'flights',
    children: [
      {
        path: 'search',
        loadComponent: () => import('./features/flights/flight-search/flight-search.component').then(m => m.FlightSearchComponent)
      },
      {
        path: 'list',
        loadComponent: () => import('./features/flights/flight-list-page/flight-list-page.component').then(m => m.FlightListPageComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/flights/flight-create/flight-create.component').then(m => m.FlightCreateComponent)
      }
    ]
  },
  {
    path: 'booking',
    children: [
      {
        path: 'search',
        loadComponent: () => import('./features/bookings/booking-search/booking-search.component').then(m => m.BookingSearchComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/bookings/booking-create/booking-create.component').then(m => m.BookingCreateComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/bookings/booking-details/booking-details.component').then(m => m.BookingDetailsComponent)
      }
    ]
  },
  {
    path: 'payment',
    loadComponent: () => import('./features/payments/payment-form/payment-form.component').then(m => m.PaymentFormComponent)
  },
  {
    path: '**',
    redirectTo: '/flights/search'
  }
];
