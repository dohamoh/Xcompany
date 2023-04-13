import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private SharedService: SharedService) { }
  title = 'velocity-FE';
  ngOnInit(): void {
    this.SharedService.updateUserData();
    this.SharedService.updateServices()
    this.SharedService.isLoggedInFun();
    // localStorage.clear()
  }
}
