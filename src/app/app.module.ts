import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryComponent,
    ScannerComponent,
    OrderDetailsComponent,
    HeaderComponent,
    ModalComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ZXingScannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
