import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string | { seconds: number; nanoseconds: number }): string {
    let date: Date;

    if (typeof value === 'string') {
      date = new Date(value);
    } else {
      date = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
    }

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
