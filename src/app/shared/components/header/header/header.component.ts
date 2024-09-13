import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/public/login/login/models/user.model';
import { AuthService } from 'src/app/modules/public/services/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user?: User;

  constructor(private SidebarToogle: SharedModule,
    private authService: AuthService,
    private router: Router
  ) { }


  onToggleSidebar() {
    this.SidebarToogle.toggle();
  }

  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl("/");
  }
}
