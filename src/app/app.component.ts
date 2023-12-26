import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { TopBarModule } from './shared/modules/topBar/topBar.module';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { GlobalFeedModule } from './globalFeed/globalFeed.module';
import { YourFeedModule } from './yourFeed/yourFeed.module';
import { TagFeedModule } from './tagFeed/tagFeed.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    AuthModule, 
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule
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
