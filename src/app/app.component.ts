import { Component, OnInit } from '@angular/core';

export interface List {
  _id?: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lister';

  constructor() {}

  ngOnInit() {
  }
}
