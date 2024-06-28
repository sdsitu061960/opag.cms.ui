import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private SidebarToogle: SharedModule) {}
    
    onToggleSidebar() {
      this.SidebarToogle.toggle();
    }
}
