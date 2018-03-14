import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GridService {

  constructor() { }
  private someClassSource= new Subject<string>();

  someClass$= this.someClassSource.asObservable();

//   changeClass(class:string) {
//      this.someClassSource.next(class);
//   }
//
 }
