import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformUsername'
})
export class TransformUsernamePipe implements PipeTransform {

  transform(value: string) {
    let index = value.indexOf('@');
    return value.slice(0, index);
  }
}
