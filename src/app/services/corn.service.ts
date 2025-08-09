import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BuyResponse {
  message: string;        // "🌽"
  clientId: string;
  totalBought: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class CornService {
  private base = environment.apiBaseUrl;
  private client: HttpClient = inject(HttpClient);

  buyCorn(clientId: string): Observable<BuyResponse> {
    const headers = new HttpHeaders({ 'X-Client-Id': clientId });
    return this.client.post<BuyResponse>(`${this.base}/api/corn/buy`, {}, { headers });
  }
}
