import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private isSidebarOpen = new BehaviorSubject<boolean>(false);
  // isSidebarOpen = false;
  setIsSidebarOpen(value: boolean) {
    this.isSidebarOpen.next(value);
  }

  getHideSideMenu() {
    return this.isSidebarOpen.asObservable();
  }
}
