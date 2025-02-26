import { CommonModule } from "@angular/common";
import { Component, effect, signal, ViewChild } from "@angular/core";
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
  @ViewChild(CompletionModalComponent) completionModal!: CompletionModalComponent;
  
  title = "Sudoku 数独";
  difficulty= signal<Difficulty>("easy");
  sudoku!: Sudoku;
  finishedGame = signal(false);

  constructor(
    private sudokuApiService: SudokuApiService
  ) {

    effect(() => {
      console.log("Se acabó el juego", this.finishedGame());
    });

    effect(() => {
      const action = this.completionModal?.selectedAction();
      if (action === 1) {
        console.log("Seleccionando nuevo nivel...");
        this.finishedGame.set(false);
        this.difficulty()
      } else if (action === 2){
        console.log("Reiniciando juego...");
        this.completionModal.isVisible.set(false);
        this.finishedGame.set(false);
        this.generateSudoku();
      }
    })
  }

  ngOnInit() {
    this.generateSudoku();
  }

  generateSudoku(difficulty: Difficulty = this.difficulty()) {
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
