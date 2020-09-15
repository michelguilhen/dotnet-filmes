import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent {
  @Input() public message: string;
  @Output() close = new EventEmitter<any>();

  onClose() {
    this.close.emit();
  }

}
