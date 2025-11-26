import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  constructor() { }

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message)
  }




  private subjectTurbineId = new Subject<any>(); //need to create a subject
  setUpdateObservableTurbineId(message: string) { //the component that wants to update something, calls this fn
      this.subjectTurbineId.next({ turbineId: message }); //next() will feed the value in Subject
  }
  getUpdateObservableTurbineId(): Observable<any> { //the receiver component calls this function 
      return this.subjectTurbineId.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }


}
