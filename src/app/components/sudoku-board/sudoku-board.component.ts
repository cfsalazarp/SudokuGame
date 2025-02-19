import { Component } from '@angular/core';
import { SudokuCellComponent } from "../sudoku-cell/sudoku-cell.component";

@Component({
  selector: 'app-sudoku-board',
  imports: [SudokuCellComponent],
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss'
})
export class SudokuBoardComponent {

}
