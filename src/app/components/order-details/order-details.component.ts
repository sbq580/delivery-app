import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent implements OnInit {
  orderId$: Observable<string>;
  order$: Observable<Order>;
  constructor(
    private router: Router,
    private stateService: StateService) { }

  ngOnInit() {
    this.orderId$ = this.stateService.orderId$;
    this.order$ = this.stateService.order$;
  }

  goBack() {
    this.router.navigateByUrl('');
  }

  cancelOrder() {
    this.stateService.setOrderId(null);
    this.router.navigateByUrl('');
  }

}
