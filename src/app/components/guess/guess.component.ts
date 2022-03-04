import { Component, Input, OnInit } from '@angular/core';
import { Guess } from 'src/app/model/guess';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss']
})
export class GuessComponent implements OnInit {

  @Input() guess: Guess = {
    word: '',
    matches: [],
  };

  constructor() {}

  ngOnInit(): void {

  }
}