import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    AuthModule, 
    TopBarModule,
    GlobalFeedModule
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  constructor(private store: Store){

  }

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
