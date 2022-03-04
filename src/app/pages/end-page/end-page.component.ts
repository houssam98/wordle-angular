import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  templateUrl: './end-page.component.html',
  styleUrls: ['./end-page.component.scss'],
})
export class EndPageComponent implements OnInit {
  constructor(private gameService: GameService) {}

  result: string = '';

  stats: Array<number> = [];

  ngOnInit(): void {
    if (this.gameService.isWinner()) {
      this.result = 'Congratulations!';
    } else {
      this.result = 'Better luck next time!';
    }

    this.stats = this.gameService.stats;
  }
}
