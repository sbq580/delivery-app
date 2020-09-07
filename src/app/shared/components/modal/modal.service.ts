import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private data = new BehaviorSubject({ show: false});
  data$ = this.data.asObservable();

  constructor() { }

  public create(options?: any) {
    options = { ...options, show: true };
    this.data.next(options);
  }

  public close() {
    const options = { show: false };
    this.data.next(options);
    window.location.reload();
  }
}
