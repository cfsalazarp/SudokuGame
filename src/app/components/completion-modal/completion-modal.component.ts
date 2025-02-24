import { CommonModule } from '@angular/common';
import { Component, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
@Component({
  selector: 'app-completion-modal',
  imports: [CommonModule],
  templateUrl: './completion-modal.component.html',
  styleUrl: './completion-modal.component.scss'
})
export class CompletionModalComponent {

  show = true;

  toogleModal(){
    this.show = !this.show;
  }
}
