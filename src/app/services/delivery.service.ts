import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbyKSwtN4FYpnI581IbpZMAXUlWnJZHdYA3aH3ORcbrpzFvigJCf/exec';
  constructor(private http: HttpClient) {}

  public initiateDelivery(item) {
    item = { action: 'in', ...item};
    return this.http.post(this.apiUrl, JSON.stringify(item))
      .pipe(
        throttleTime(5000)
      );
  }

  public closeDelivery(item) {
    item = { action: 'out', ...item};
    return this.http.post(this.apiUrl, JSON.stringify(item));
  }
}
