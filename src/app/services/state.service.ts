import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  // Order Id
  private orderId = new BehaviorSubject(null);
  public orderId$ = this.orderId.asObservable();
  // Show header
  private showHeader = new BehaviorSubject(true);
  public showHeader$ = this.showHeader.asObservable();
  // Current Order object
  private order = new BehaviorSubject(null);
  public order$ = this.order.asObservable();

  constructor() {
  }

  public setOrderId(id: string) {
      this.orderId.next(id);
  }

  public setShowHeader(val: boolean) {
    this.showHeader.next(val);
  }

  public setOrder(data: Order) {
    this.order.next(data);
  }

  public resetState() {
    this.orderId.next(null);
    this.order.next(null);
  }
}
