import { Pipe, PipeTransform } from '@angular/core';
import { GuessResult } from '../model/guess-result';

@Pipe({
  name: 'matchColor',
})
export class MatchColorPipe implements PipeTransform {
  /**
   * Transforms the value of a GuessReuslt to a color (green, yellow, gray or black)
   * @param value
   * @param args
   * @returns
   */
  transform(value: GuessResult): string {
    switch (value) {
      case GuessResult.GOOD_POSITION:
        return '#00AA00';
      case GuessResult.NOT_TRIED:
        return '#808080';
      case GuessResult.WRONG_POSITION:
        return '#DDDD00';
      case GuessResult.NO_MATCH:
        return '#000000';
    }
  }
}
