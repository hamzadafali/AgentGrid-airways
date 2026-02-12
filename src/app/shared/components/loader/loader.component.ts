import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    @if (loadingService.loading$ | async) {
      <div class="loading-overlay">
        <mat-spinner diameter="60"></mat-spinner>
      </div>
    }
  `,
  styles: []
})
export class LoaderComponent {
  constructor(public loadingService: LoadingService) {}
}
