import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() public message: string;
  @Output() close = new EventEmitter<boolean>();

  onConfirm() {
    this.close.emit(true);
  }

  onClose() {
    this.close.emit(false);
  }
}
