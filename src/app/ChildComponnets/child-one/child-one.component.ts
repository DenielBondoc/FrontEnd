import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.css']
})
export class ChildOneComponent implements OnInit, OnChanges {

  @Input()loggedIn!: boolean;
  message!: string;

  name = 'deniel';
  @Output()greetEvent = new EventEmitter;
  // get loggedIn(): boolean {
  //   return this._loginFlag;
  // }

  // @Input() set loggedIn(value: boolean){
  //   this._loginFlag = value;
  //   if(value === true){
  //     this.message = 'Welcome Back'
  //   }else{
  //     this.message = 'Please login'
  //   }
  // }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const loggedInValue = changes['loggedIn'];
    if(loggedInValue.currentValue === true){
      this.message = 'Welocomback ' + this.name;
    }else{
      this.message = 'Please log in'
    }
  }

  alertDeniel(){
    alert('Hello Alert');
  }

  callParentGreet(){
    this.greetEvent.emit();
  }
}
