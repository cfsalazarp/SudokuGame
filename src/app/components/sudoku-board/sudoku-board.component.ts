import {
  Component,
  EventEmitter,
  HostListener,
  OnChanges,
  Input,
  signal,
  SimpleChanges,
  input,
  effect,
  WritableSignal
} from "@angular/core";
import { Sudoku, SudokuField } from "../../core/models/sudoku.model"; // Adjust the path as necessary
import { CommonModule } from "@angular/common";
import { SudokuGridComponent } from "../sudoku-grid/sudoku-grid.component";

const between = (newValue: number, min: number, max: number) => {
  return Math.min(Math.max(newValue, min), max);
};

@Component({
  selector: "app-sudoku-board",
  imports: [CommonModule, SudokuGridComponent],
  templateUrl: "./sudoku-board.component.html",
  styleUrl: "./sudoku-board.component.scss",
})
export class SudokuBoardComponent implements OnChanges {
  readonly sudoku = input<Sudoku>([]);
  @Input() finishedGame!: WritableSignal<boolean>;

  constructor() {

    effect(() => {
      console.log("activeField desde el parent: ", this.activeField());
    });
  }

  draftMode = signal(false);
  activeField= signal<SudokuField>({answer: 0});

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes: ", changes["sudoku"]);
  }

  @HostListener("window:keydown.backspace")
  onBackspace(event: KeyboardEvent) {
    this.erase();
  }

  @HostListener("window:keydown.arrowUp")
  onArrowUp(event: KeyboardEvent) {
    this.moveFocus(-1,0);
  }

  @HostListener("window:keydown.arrowDown")
  onArrowDown(event: KeyboardEvent) {
    this.moveFocus(1,0);
  }

  @HostListener("window:keydown.arrowLeft")
  onArrowLeft(event: KeyboardEvent) {
    this.moveFocus(0,-1);
  }

  @HostListener("window:keydown.arrowRight")
  onArrowRight(event: KeyboardEvent) {
    this.moveFocus(0,1);
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {  
    const number = parseInt(event.key, 10);
    if (!this.activeField || isNaN(number) || number < 1 || number > 9) {
      return;
    }
    this.insertNumber(number);
    this.checkFinished();
  }

  insertNumber(number: number) {
    console.log("activeField: ", this.activeField());
    console.log("insertando el: ", number);
    if (this.activeField() && !this.activeField().readonly) {
      this.activeField().value = number;
      console.log("this.activeField",this.activeField());
    }
  }

  erase(){
    if (this.activeField() && !this.activeField().readonly) {
      this.activeField().value = undefined;
      this.activeField().notes = [];         
    }
  }

  currentRow(): number {
    console.log("currentRow",this.sudoku().findIndex(row => row.indexOf(this.activeField()) !== -1));
    return this.sudoku().findIndex(row => row.indexOf(this.activeField()) !== -1);
  }

  currentCol(): number {
    console.log("CurrentCol", this.sudoku()[this.currentRow()].indexOf(this.activeField()));
    return this.sudoku()[this.currentRow()].indexOf(this.activeField());
  }

  moveFocus(row: number, col: number){
    let newRow = between (this.currentRow() + row, 0, 8);
    let newCol = between (this.currentCol() + col, 0, 8);
    this.activeField.set(this.sudoku()[newRow][newCol]);
  }

  checkFinished(){
    console.log("checkFinishedFunc");
    if(this.finished()){
      console.log("checkFinishedFunc if", this.finishedGame());
      this.finishedGame.set(true);
      console.log("checkFinishedFunc after set");
    }
  }

  finished(): boolean{
    //return this.sudoku().every(row => row.every(col => col.value == col.answer));
    console.log("finishedFunc");
    
    return true;
  }
}
