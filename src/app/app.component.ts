import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SudokuBoardComponent } from "./components/sudoku-board/sudoku-board.component";
import { SudokuApiService } from './core/services/sudoku-api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, SudokuBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Sudoku by ch';
  selectedDifficulty = "easy";

  constructor(private sudokuApiService: SudokuApiService){}

  ngOnInit(){
    const response = this.sudokuApiService.getSudokuData().subscribe({
      next: (value) => console.log("value",value),
    });
    console.log("response", response);    
  }
}
