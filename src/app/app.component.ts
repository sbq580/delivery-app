import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';
import { Observable } from 'rxjs';
import { ModalService } from './shared/components/modal/modal.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'receipt';
  toShow: Observable<boolean>;
  constructor(
    private stateService: StateService,
    private mdService: ModalService,
    private updateService: UpdateService) {

  }

  ngOnInit() {
    this.toShow = this.stateService.showHeader$;
    // Check for update
    this.updateService.checkForUpdate().subscribe(data => {
      this.mdService.create({
        header: 'Alert modal',
        body: 'There is a update. You have to update to continue.'
      });
    });
  }

  open() {
    this.mdService.create({
      header: 'Alert modal',
      body: 'There is a update. You have to update to continue.'
    });
  }
}
