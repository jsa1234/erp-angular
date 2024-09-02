import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DynamicTabsService } from '@shared/services/dynamic-tab.service';

@Component({
  selector: 'app-pos-main',
  templateUrl: './pos-main.component.html',
  styleUrls: ['./pos-main.component.scss']
})
export class PosMainComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleClosePos(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.closePos()
    }
  }
  tabs: string[] = [];
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  constructor(private dynamicTabsService: DynamicTabsService, private router:Router) {
  }

  addTab() {
    // Generate a unique tab label, e.g., using a timestamp
    const tabLabel = `Tab ${Date.now()}`;
    this.dynamicTabsService.addTab(tabLabel);

    // Focus on the newly added tab
    if (this.tabGroup) {
      this.tabGroup.selectedIndex = this.tabs.length - 1;
    }
  }
  ngOnInit(): void {
    this.dynamicTabsService.tabsSubject.subscribe((tabs) => {
      this.tabs = tabs;
    });
  }
  removeTab(tabLabel: string) {
    this.dynamicTabsService.removeTab(tabLabel);
  }
  closePos():void{
    this.router.navigate(['']);
  }

}
