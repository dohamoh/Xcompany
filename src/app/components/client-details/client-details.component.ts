import { Component, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent {

  @Input()clientData:any

  @Output() closeClientDetails:EventEmitter<any> = new EventEmitter<any>();
ngOnInit(): void {
  console.log(this.clientData);

}
  // lineTransform = 'scaleX(0)';
  // @HostListener('window:scroll', [])
  // onWindowScroll() {
  //   const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  //   const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  //   const documentHeight = Math.max(
  //     document.body.scrollHeight,
  //     document.documentElement.scrollHeight,
  //     document.body.offsetHeight,
  //     document.documentElement.offsetHeight,
  //     document.body.clientHeight,
  //     document.documentElement.clientHeight
  //   );
  //   const progress = Math.min(scrollPos / (documentHeight - windowHeight), 1);
  //   this.lineTransform = `scaleX(${progress})`;
  // }clientData

  closeDetails() {
    this.closeClientDetails.emit('');
  }
}
