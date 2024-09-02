// dynamic-tabs.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicTabsService {
  private tabs: string[] = ['Initial Tab']; // Initialize with one default tab
  tabsSubject = new BehaviorSubject<string[]>(this.tabs);

  addTab(tabLabel: string) {
    this.tabs.push(tabLabel);
    this.tabsSubject.next([...this.tabs]);
  }

  removeTab(tabLabel: string) {
    this.tabs = this.tabs.filter((label) => label !== tabLabel);
    this.tabsSubject.next([...this.tabs]);
  }
}
