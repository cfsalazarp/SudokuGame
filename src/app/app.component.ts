import { CommonModule } from "@angular/common";
import { Component, computed, effect, signal, WritableSignal } from "@angular/core";
import { SudokuBoardComponent } from "./components/sudoku-board/sudoku-board.component";
import { SudokuApiService } from "./core/services/sudoku-api.service";
import { Sudoku, Difficulty } from "./core/models/sudoku.model";
import { ModalComponent } from "./components/modal/modal.component";

@Component({
  selector: "app-root",
  imports: [
    CommonModule,
    SudokuBoardComponent,
    ModalComponent
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {

  title = "Sudoku 数独";
  sudoku!: Sudoku;
  difficulty = signal<Difficulty>("easy");
  finishedGame: WritableSignal<boolean> =  signal(false);
  showDifficultyModal = signal(false);
  showWinModal = computed(() => this.finishedGame());

  difficulties: Difficulty[] = ["easy", "medium", "hard"];

  constructor(private sudokuApiService: SudokuApiService) {
    effect(() => {
      this.generateSudoku();
    });
  }

  ngAfterViewInit() {
    this.generateSudoku();
  }

  openDifficultyModal() {
    this.finishedGame.set(false);
    this.showDifficultyModal.set(true);
  }

  setDifficulty(level: Difficulty) {
    this.difficulty.set(level);
    this.showDifficultyModal.set(false);
    this.generateSudoku();
  }

  restartGame() {
    this.finishedGame.set(false);
    this.generateSudoku();
  }

  generateSudoku(difficulty: Difficulty = this.difficulty()) {
    this.finishedGame.set(false);
    console.log("Generando Sudoku nivel: ", this.difficulty());
    this.sudokuApiService.getSudokuData().subscribe({
      next: (response) => {
        this.sudoku = response.data.map((row) =>
          row.map((number) => ({ answer: Number(number) }))
        );

        response[difficulty].forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            this.sudoku[rowIndex][colIndex].value =
              Number(value) === 0 ? undefined : Number(value);
            this.sudoku[rowIndex][colIndex].readonly = Number(value) !== 0;
          });
        });
      },
    });
  }
}
