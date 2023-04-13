import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {
  @Input()clientData:any

  @Output() closeClientDetails:EventEmitter<any> = new EventEmitter<any>();

  closeDetails() {
    this.closeClientDetails.emit('');
  }
}
