import { CommonModule } from '@angular/common';
import { Component, Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-completion-modal',
  imports: [CommonModule],
  templateUrl: './completion-modal.component.html',
  styleUrl: './completion-modal.component.scss'
})
export class CompletionModalComponent {

  isVisible = signal(false);

  openModal() {
    this.isVisible.set(true);
  }

  closeModal() {
    this.isVisible.set(false);
  }

  selectedAction = signal<number | null>(null);

  chooseNewLevel() {
    this.selectedAction.set(1);
    this.closeModal();
  }

  restartGame() {
    this.selectedAction.set(2);
    this.closeModal();
  }

}
