import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeliveryService } from 'src/app/services/delivery.service';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, OnDestroy {
  orderId: string;
  successTxt: string;

  // Subscriptions
  orderIdSubs: Subscription;
  constructor(
    private deliveyService: DeliveryService,
    private router: Router,
    private stateService: StateService) { }

  ngOnInit() {
    this.orderIdSubs = this.stateService.orderId$.subscribe(data => {
      if (data) {
        this.orderId = data;
      } else {
        this.orderId = null;
      }
    });
  }

  initiate() {
    this.router.navigateByUrl('scanner').then(val => {
      this.stateService.setShowHeader(false);
    });
  }

  close() {
    if (this.orderId) {
      this.deliveyService.closeDelivery(
        {
          dc_id: this.orderId
        }
      ).subscribe((data: any) => {
        if (data.status === 200) {
          this.successTxt = data.message;
          this.stateService.resetState();
        }
      });
    }
  }

  closeAlert() {
    this.successTxt = null;
  }

  goTo(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnDestroy() {
    this.orderIdSubs.unsubscribe();
  }

}
