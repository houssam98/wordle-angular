import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'triesNumber',
})
export class TriesNumberPipe implements PipeTransform {
  /**
   * Transforms the value of a GuessReuslt to a color (green, yellow, gray or black)
   * @param value
   * @param args
   * @returns
   */
  transform(value: number): string {
    switch (value) {
      case 6:
        return 'Lost';
      default:
        return (value + 1).toString();
    }
  }
}
