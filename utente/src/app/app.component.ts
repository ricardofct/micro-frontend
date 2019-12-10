import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'utente-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'utente';

  list = new Array(10);

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
