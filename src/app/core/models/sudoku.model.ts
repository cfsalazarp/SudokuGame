export type Sudoku = SudokuField[][];

export interface SudokuField {
    value?: number;
    notes?: number[];
    answer: number;
    readonly?: boolean;
}

export interface SudokuResponse {
    data: string[][];
    easy: string[][];
    medium: string[][];
    hard: string[][];
}

export interface NumberButton {
    number: number;
    disabled?: boolean;
  }

export type Difficulty = "easy" | "medium" | "hard";