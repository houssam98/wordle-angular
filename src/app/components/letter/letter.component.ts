import { Component, Input, OnInit } from '@angular/core';
import { GuessResult } from 'src/app/model/guess-result';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit {
  @Input() letter: string = '';
  @Input() result: GuessResult = GuessResult.NOT_TRIED;

  constructor() {}

  ngOnInit(): void {}
}
