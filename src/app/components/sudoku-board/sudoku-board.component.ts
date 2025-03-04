import {
  Component,
  HostListener,
  Input,
  signal,
  input,
  effect,
  WritableSignal
} from "@angular/core";
import { Sudoku, SudokuField, NumberButton } from "../../core/models/sudoku.model"; // Adjust the path as necessary
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
export class SudokuBoardComponent {
  readonly sudoku = input<Sudoku>([]);
  @Input() finishedGame!: WritableSignal<boolean>;

  constructor() {
    effect(() => {
      console.log("activeField desde el parent: ", this.activeField());
    });
  }

  notesMode = signal(false);
  activeField= signal<SudokuField>({answer: 0});

  numberButtons: NumberButton[] = [
    {number: 1},
    {number: 2},
    {number: 3},
    {number: 4},
    {number: 5},
    {number: 6},
    {number: 7},
    {number: 8},
    {number: 9}
  ];

  @HostListener("window:keydown.backspace")
  onBackspace() {
    this.erase();
  }

  @HostListener("window:keydown.arrowUp")
  onArrowUp() {
    this.moveFocus(-1,0);
  }

  @HostListener("window:keydown.arrowDown")
  onArrowDown() {
    this.moveFocus(1,0);
  }

  @HostListener("window:keydown.arrowLeft")
  onArrowLeft() {
    this.moveFocus(0,-1);
  }

  @HostListener("window:keydown.arrowRight")
  onArrowRight() {
    this.moveFocus(0,1);
  }

  @HostListener("window:keydown.space")
  onSpace() {
    this.notesMode.set(!this.notesMode());
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {  
    const number = parseInt(event.key, 10);
    if (!this.activeField || isNaN(number) || number < 1 || number > 9) {
      return;
    }
    this.insertNumber(number);
  }

  insertNumber(number: number) {
    console.log("this.activeField", this.activeField().notes);
    
    const field = this.activeField();
    console.log("insertNumber:", number);
    console.log("field", field);
    
    console.log(this.notesMode());
    
    
    if (this.notesMode() && !field.value) {
      console.log("this.notesMode() && !field.value");
      console.log("field", field.notes);
      if (!field.notes) {
        console.log("!field.notes");
        field.notes = [];
      } 
      if (!field.notes?.find(data => data === number)) {
        console.log("!field.notes?.find(data => data === number)");
        field.notes?.push(number);
      }else {
        console.log("else");
        field.notes = field.notes?.filter(data => data !== number);
      }
    } else if(!this.notesMode() && !field.readonly){
      console.log("!this.notesMode && !field.readonly");
      field.value = number;

      this.cleanNotes();
      this.checkFinished();
    }
  }

  erase(){
    if (this.activeField() && !this.activeField().readonly) {
      this.activeField().value = undefined;
      this.activeField().notes = [];         
    }
  }

  cleanNotes(){
    this.activeField().notes = [];
  }

  currentRow(): number {
    console.log("currentRow",this.sudoku().findIndex(row => row.indexOf(this.activeField()) !== -1));
    return this.sudoku().findIndex(row => row.indexOf(this.activeField()) !== -1);
  }

  currentCol(): number {
    if (!this.activeField || this.currentRow() === -1) {
      return -1;
    }
    console.log("CurrentCol", this.sudoku()[this.currentRow()].indexOf(this.activeField()));
    return this.sudoku()[this.currentRow()].indexOf(this.activeField());
  }

  moveFocus(row: number, col: number){
    if (!this.activeField) {
      return;
    }

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
    console.log("finishedFunc");
    return this.sudoku().every(row => row.every(col => col.value == col.answer));
  }
}
