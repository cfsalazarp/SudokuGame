import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SudokuResponse } from '../models/sudoku.model';
import { Observable } from 'rxjs/internal/Observable';

const API_URL = "https://sudoku-game-and-api.netlify.app/api/sudoku";
const PROXY_URL = "https://api.allorigins.win/raw?url=";

@Injectable({
  providedIn: 'root'
})
export class SudokuApiService {

  constructor( private http: HttpClient ) { }

  getSudokuData(): Observable<SudokuResponse> {
      const data = this.http.get<SudokuResponse>(`${PROXY_URL}${encodeURIComponent(API_URL)}`);
      return data;
  }
}
