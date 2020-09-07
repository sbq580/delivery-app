import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalId = 'modal-1';
  modalData$: Observable<any>;
  data$: any;
  modalBgEl: HTMLElement;
  modalContentEl: HTMLElement;
  closing = false;
  constructor(private mdService: ModalService) {}

  ngOnInit() {
    this.mdService.data$.subscribe(data => {
      this.data$ = data;
      if (data.show) {
        this.createBgEl();
      }
    });
  }

  private createBgEl() {
    // Create backdrop
    const el = document.createElement('div');
    el.classList.add('modal-background');
    el.classList.add('fade');
    document.body.appendChild(el);
  }

  private removeBgEl() {
    // Remove backdrop
    const el = document.getElementsByClassName('modal-background');
    // Remove modal classes
    this.closing = true;
    setTimeout(() => {
      el[0].remove();
      this.mdService.close();
      this.closing = false;
    }, 450);
  }

  close() {
    this.removeBgEl();
  }

}
