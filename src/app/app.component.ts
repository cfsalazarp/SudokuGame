import { CommonModule } from "@angular/common";
import { Component, effect, signal } from "@angular/core";
import { SudokuBoardComponent } from "./components/sudoku-board/sudoku-board.component";
import { SudokuApiService } from "./core/services/sudoku-api.service";
import { Sudoku } from "./core/models/sudoku.model";
import { CompletionModalComponent } from "./components/completion-modal/completion-modal.component";

export type Difficulty = "easy" | "medium" | "hard";
@Component({
  selector: "app-root",
  imports: [CommonModule, SudokuBoardComponent, CompletionModalComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Sudoku 数独";
  difficulty: Difficulty = "easy";
  sudoku!: Sudoku;
  finishedGame = signal(false);

  constructor(
    private sudokuApiService: SudokuApiService,
    private completionModal: CompletionModalComponent
  ) {

    effect(() => {
      console.log("Se acabó el juego", this.finishedGame());
      console.log(this.completionModal.show);
      this.completionModal.toogleModal();
      console.log(this.completionModal.show);
    });
  }

  ngOnInit() {
    this.generateSudoku(this.difficulty);
  }

  generateSudoku(difficulty: Difficulty) {
    this.sudokuApiService.getSudokuData().subscribe({
      next: (response) => {
        this.sudoku = response.data.map((row) =>
          row.map((number) => ({ answer: Number(number) }))
        );

        response[difficulty].forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            this.sudoku[rowIndex][colIndex].value = Number(value) === 0 ? undefined : Number(value);
            this.sudoku[rowIndex][colIndex].readonly = Number(value) !== 0;
          });
        });
      },
    });
  }
}
