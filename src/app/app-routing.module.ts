import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

const routes: Routes = [
  { path: 'delivery', component: DeliveryComponent},
  { path: 'scanner', component: ScannerComponent},
  { path: 'order', component: OrderDetailsComponent},
  { path: '', redirectTo: 'delivery', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
