import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor() { }

  isEmpty(value){
    return (value == null || value === '');
  }

}
