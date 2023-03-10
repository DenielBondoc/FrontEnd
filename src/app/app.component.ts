import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildOneComponent } from './ChildComponnets/child-one/child-one.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  title = 'FrontEnd';

  @ViewChild(ChildOneComponent) childComponentRef!: ChildOneComponent;

  userLoggedIn!: boolean;

  greet(){
    alert('hello child');
  }

  ngAfterViewInit(): void {
    this.childComponentRef.message = 'message from parent component'
  }
}
