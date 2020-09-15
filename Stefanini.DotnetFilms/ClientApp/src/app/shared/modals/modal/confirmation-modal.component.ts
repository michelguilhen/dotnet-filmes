import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Input() public message: string;
  @Output() close = new EventEmitter<boolean>();

  onConfirm() {
    this.close.emit(true);
  }

  onClose() {
    this.close.emit(false);
  }
}
