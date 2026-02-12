import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PassengerService } from '../../../core/services/passenger.service';
import { Passenger, CreatePassengerDto } from '../../../core/models';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-passenger-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit {
  @Input() passenger?: Passenger;
  @Output() passengerSubmit = new EventEmitter<Passenger>();

  passengerForm!: FormGroup;
  existingPassenger: Passenger | null = null;

  constructor(
    private fb: FormBuilder,
    private passengerService: PassengerService
  ) {}

  ngOnInit(): void {
    this.passengerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      passportNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]]
    });

    if (this.passenger) {
      this.passengerForm.patchValue(this.passenger);
    }

    // Check if passenger exists when email changes
    this.passengerForm.get('email')?.valueChanges.subscribe(email => {
      if (email && this.passengerForm.get('email')?.valid) {
        this.checkPassengerByEmail(email);
      }
    });

    // Check if passenger exists when passport changes
    this.passengerForm.get('passportNumber')?.valueChanges.subscribe(passport => {
      if (passport && passport.length >= 6) {
        this.checkPassengerByPassport(passport);
      }
    });
  }

  checkPassengerByEmail(email: string): void {
    this.passengerService.getPassengerByEmail(email)
      .pipe(catchError(() => of(null)))
      .subscribe(passenger => {
        if (passenger) {
          this.existingPassenger = passenger;
          this.passengerForm.patchValue({
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            phoneNumber: passenger.phoneNumber,
            passportNumber: passenger.passportNumber,
            dateOfBirth: new Date(passenger.dateOfBirth)
          });
        }
      });
  }

  checkPassengerByPassport(passport: string): void {
    this.passengerService.getPassengerByPassport(passport)
      .pipe(catchError(() => of(null)))
      .subscribe(passenger => {
        if (passenger) {
          this.existingPassenger = passenger;
          this.passengerForm.patchValue({
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            email: passenger.email,
            phoneNumber: passenger.phoneNumber,
            dateOfBirth: new Date(passenger.dateOfBirth)
          });
        }
      });
  }

  onSubmit(): void {
    if (this.passengerForm.valid) {
      if (this.existingPassenger) {
        this.passengerSubmit.emit(this.existingPassenger);
      } else {
        const formValue = this.passengerForm.value;
        const passengerDto: CreatePassengerDto = {
          ...formValue,
          dateOfBirth: this.formatDate(formValue.dateOfBirth)
        };

        this.passengerService.createPassenger(passengerDto).subscribe({
          next: (passenger) => {
            this.passengerSubmit.emit(passenger);
          },
          error: (error) => {
            console.error('Error creating passenger:', error);
          }
        });
      }
    }
  }

  private formatDate(date: Date): string {
    if (typeof date === 'string') return date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
