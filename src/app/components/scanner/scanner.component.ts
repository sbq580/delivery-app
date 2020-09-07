import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { StateService } from 'src/app/services/state.service';
import { throttleTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit, OnDestroy {
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrTxt: any;
  toastTxt: string;
  private result: Subject<string> = new Subject();
  private resultObs$ = this.result.asObservable();
  private rsltSubscription: Subscription;
  constructor(
    private router: Router,
    private deliveryService: DeliveryService,
    private stateService: StateService) { }

  ngOnInit() {
    this.rsltSubscription = this.resultObs$
      .pipe(
        throttleTime(5000)
      )
      .subscribe(data => {
        if (data) {
          this.initiateDelivery(data);
        }
      });
  }


  onCodeResult(resultString: string): void {
    if (resultString) {
      console.log('Code scanned', resultString);
      this.qrTxt = resultString;
      this.toastTxt = `The product id is ${this.qrTxt}. Initiating delivery ...`;
      this.result.next(this.qrTxt);
    }
  }

  private initiateDelivery(response) {
    // Initiate the delivery with the time
    this.deliveryService.initiateDelivery({
      dc_id: response
    }).subscribe((data: any) => {
      if (data.status === 200) {
        // Set the order id in state
        this.stateService.setOrderId(response);
        // Set the order details
        this.stateService.setOrder(data.data);
        // Route to Order details page
        this.routeTo('order');
      } else {
        this.toastTxt = data.message;
      }
    }, error => {

    });
  }

  onHasPermission(has: boolean): void {
    this.hasPermission = has;
  }

  close() {
    this.routeTo('');
  }

  closeAlert() {
    this.qrTxt = null;
  }

  private routeTo(path: string) {
    this.router.navigateByUrl(path).then(val => {
      this.stateService.setShowHeader(true);
    });
  }

  ngOnDestroy() {
    this.rsltSubscription.unsubscribe();
  }

}
