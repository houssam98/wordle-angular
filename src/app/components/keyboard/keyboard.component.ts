import { Component, OnInit } from '@angular/core';
import { ALPHABET } from 'src/app/model/guess';
import { GuessResult } from 'src/app/model/guess-result';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  alphabet: string[] = ALPHABET;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {}

  charResult(char: string): GuessResult {
    return this.gameService.charResult(char);
  }
}