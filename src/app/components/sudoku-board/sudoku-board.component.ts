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
    let field = this.activeField();
    if (field && !field?.readonly) {
      field.value = number;
      console.log("field",field);
      console.log("this.activeField",this.activeField());
    }
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
