import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sudoku-cell',
  imports: [],
  templateUrl: './sudoku-cell.component.html',
  styleUrl: './sudoku-cell.component.scss'
})
export class SudokuCellComponent {
  @ViewChild("sudokuCell") sudokuCell!: ElementRef;

  ngOnInit(){
    console.log("sudokuCell",this.sudokuCell);
  }

  addValue(value: number) {
    this.sudokuCell.nativeElement.innerText = value;
  }

  onClick() {
    this.sudokuCell.nativeElement.textContent = "true";
    this.sudokuCell.nativeElement.focus();
    const value = this.sudokuCell.nativeElement.value = null;
    if (value !== null) {
      this.addValue(Number(value));
    }
  }
}
