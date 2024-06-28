import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isMenuExpanded: boolean = false;
  isRboMenuExpanded: boolean = false;


  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  toggleRboMenu() {
    this.isRboMenuExpanded = !this.isRboMenuExpanded;
  }
}
