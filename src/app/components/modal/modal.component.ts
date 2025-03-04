import { Component, Input, Output, EventEmitter, signal, ChangeDetectionStrategy, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() isOpen: WritableSignal<boolean> = signal(false);
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.isOpen.set(false);
    this.closeModal.emit();
  }
}
