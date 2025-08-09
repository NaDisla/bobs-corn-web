import { Component, inject } from '@angular/core';
import { CornService, BuyResponse } from './services/corn.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = "Bob's Corn";
  clientId = `client-${Math.random().toString(36).slice(2, 7)}`;
  totalBought = 0;
  lastStatus = '';
  isLoading = false;

  private cornService = inject(CornService);

  buy() {
    if (!this.clientId.trim()) {
      this.lastStatus = 'Please provide a Client Id.';
      return;
    }

    this.isLoading = true;
    this.lastStatus = 'Processing...';

    this.cornService.buyCorn(this.clientId).subscribe({
      next: (res: BuyResponse) => {
        this.totalBought = res.totalBought;
        this.lastStatus = `Success ${res.message} (total: ${this.totalBought})`;
        this.isLoading = false;
      },
      error: (err: { status: number; message: any; }) => {
        if (err.status === 429) {
          this.lastStatus = '⏳ Rate limited: 1 corn per minute per client. Try again in a minute.';
        } else {
          this.lastStatus = `Error: ${err.message || 'Unknown error'}`;
        }
        this.isLoading = false;
      }
    });
  }
}
