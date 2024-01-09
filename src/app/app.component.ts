import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from './auth/store/actions/getCurrentUser.action';
import { TopBarComponent } from './shared/modules/topBar/components/topBar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    TopBarComponent
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
