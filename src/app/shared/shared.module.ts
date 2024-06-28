import { EventEmitter, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { 
  toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  isSidebarEnabled: boolean = false;
  isVerticalCollapsed: boolean = false;

  toggle() {
    this.isSidebarEnabled = !this.isSidebarEnabled;
    this.isVerticalCollapsed = !this.isVerticalCollapsed;
    this.toggleSidebar.emit(this.isSidebarEnabled);
  }
}
