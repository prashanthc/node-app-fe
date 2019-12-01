import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader = new Subject<boolean>();

  load(): Observable<boolean> {
    return this.loader.asObservable();
  }

  showLoader() {
    this.loader.next(true);
  }

  destroyLoader() {
    this.loader.next(false);
  }

  constructor() { }
}
