import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { TopBarModule } from './shared/modules/topBar/topBar.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AuthModule, TopBarModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
