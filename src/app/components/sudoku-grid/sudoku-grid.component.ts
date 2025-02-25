import { Component, EventEmitter, HostListener, Input, Output, WritableSignal, input, signal } from "@angular/core";
import { Sudoku, SudokuField } from "../../core/models/sudoku.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-sudoku-grid",
  imports: [CommonModule],
  templateUrl: "./sudoku-grid.component.html",
  styleUrl: "./sudoku-grid.component.scss",
})
export class SudokuGridComponent {
  readonly sudoku = input<Sudoku>([]);
  @Input() activeField!: WritableSignal<SudokuField>;

  onFieldClick(field: SudokuField): void {
    console.log("field selected in Child: ",field);
    this.activeField.set(this.activeField() !== field ? field : {answer: -1});
  }

  get currentRow(): number {
    return this.sudoku().findIndex(row => row.indexOf(this.activeField()) !== -1);
  }

  get currentCol(): number {
    if (!this.activeField || this.currentRow === -1) {
      return -1;
    }

    return this.sudoku()[this.currentRow].indexOf(this.activeField());
  }
}
