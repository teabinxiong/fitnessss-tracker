import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  private auth = inject(Auth);
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth?: boolean = false;
  subscriptions?: Subscription[] =  [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscriptions?.push(this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    }));

    this.subscriptions?.push(authState(this.auth).subscribe( currentUser => {

      if(currentUser == null){
          this.isAuth = false;
      }
      else {
          this.isAuth = true;
      }

      console.log(this.isAuth);
  }));
  }

  onToggleSideNav(){
    this.sidenavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions?.map(subscription => {
      subscription.unsubscribe();
    });
  }

}
