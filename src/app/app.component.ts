import { Component } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'opag.cms.ui';

  constructor(private SidebarToogle: SharedModule) {}

  ngOnInit() {
    
    this.SidebarToogle.toggleSidebar.subscribe((isSidebarEnabled: boolean) => {
      const body = document.body;
      body.classList.toggle('sidebar-enable', isSidebarEnabled);
      body.classList.toggle('vertical-collpsed', this.SidebarToogle.isVerticalCollapsed);
    });
  }
}