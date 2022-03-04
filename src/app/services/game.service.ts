import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MAX_NUMBER_OF_GUESSES } from '../model/guess';
import { GuessResult } from '../model/guess-result';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private word: string = '';
  private wordList: Array<string> = [];
  private guesses: Array<string> = [];

  stats: Array<number> = [0, 0, 0, 0, 0, 0, 0];

  constructor(private http: HttpClient) {
    if (localStorage.getItem('stats')) {
      this.stats = <Array<number>>(
        JSON.parse(<string>localStorage.getItem('stats'))
      );
    }
  }

  initWordList() {
    // We load the words from a static file
    return this.http.get<string[]>('assets/json/word-list.json').pipe(
      tap((result) => {
        this.wordList = result;
      })
    );
  }

  /**
   * Starts the game by selecting a random word from the list.
   */
  startGame() {
    this.word = this.wordList[Math.round(Math.random() * this.wordList.length)];
    console.log('Game starting, the word is ' + this.word);
  }

  /**
   * Reset the game by clearing the guesses array.
   */
  resetGame() {
    this.guesses = [];
  }

  /**
   * Checks whether the given list is in the word list.
   * @param guessedWord
   * @returns
   */
  isInWordList(guessedWord: string): Boolean {
    return this.wordList.indexOf(guessedWord.toLowerCase()) != -1;
  }

  /**
   * Evaluates a guess.
   * @param guessedWord
   * @returns
   */
  guess(guessedWord: string): GuessResult[] {
    guessedWord = guessedWord.toLowerCase();
    this.guesses.push(guessedWord);
    return this.calculateMatches(guessedWord);
  }

  /**
   * Returns whether the game is finished yet.
   * @returns
   */
  isFinished(): boolean {
    const condition =
      (this.guesses.length != 0 &&
        this.guesses[this.guesses.length - 1] == this.word) ||
      this.guesses.length >= MAX_NUMBER_OF_GUESSES;

    if (condition) {
      if (this.isWinner()) {
        this.stats[this.guesses.length - 1] += 1;
      } else {
        this.stats[this.guesses.length] += 1;
      }
      localStorage.setItem('stats', JSON.stringify(this.stats));
    }

    return condition;
  }

  /**
   * Returns whether the player won or not.
   * @returns
   */
  isWinner(): boolean {
    return (
      this.guesses.length != 0 &&
      this.guesses[this.guesses.length - 1] == this.word
    );
  }

  /**
   * Calculates the guess result for each character in the given word.
   * @param word
   * @returns
   */
  calculateMatches(word: string): GuessResult[] {
    let matches = Array<GuessResult>();
    for (let i = 0; i < 5; i++) {
      let char = word.charAt(i);
      if (this.word.charAt(i) == char) {
        matches.push(GuessResult.GOOD_POSITION);
      } else if (this.word.indexOf(char) != -1) {
        matches.push(GuessResult.WRONG_POSITION);
      } else {
        matches.push(GuessResult.NO_MATCH);
      }
    }
    return matches;
  }

  /**
   * Returns whether the given character was guessed in any position.
   * @param char
   * @returns
   */
  charResult(char: string): GuessResult {
    let result = GuessResult.NOT_TRIED;

    for (let guess of this.guesses) {
      let guessResult = this.calculateMatches(guess);

      // Go over the characters of each word
      for (let i = 0; i < 5; i++) {
        // If the guessed char is the current char
        if (char.toLowerCase() == guess[i]) {
          if (result == GuessResult.NOT_TRIED) {
            // If it was tried at least once, we can be sure that the result would be at least NO MATCH (possibly better)
            result = GuessResult.NO_MATCH;
          }

          if (guessResult[i] == GuessResult.GOOD_POSITION) {
            // If we find a GOOD POSITION, we can disregard each other finds and return that as our result.
            return GuessResult.GOOD_POSITION;
          } else if (guessResult[i] == GuessResult.WRONG_POSITION) {
            // Else, if we find a WRONG POSITION, we save it as the "next best result" but we keep searching
            result = GuessResult.WRONG_POSITION;
          }
        }
      }
    }
    return result;
  }
}
