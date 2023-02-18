import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
