import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-for-wiktor',
  templateUrl: './example-for-wiktor.component.html',
  styleUrls: ['./example-for-wiktor.component.css']
})
export class ExampleForWiktorComponent {

  inputText = 'Pole tekstowe';

  inputText2Way = '';

  button = true;
  showClick = 'false';

  click(){
    this.showClick = 'Przycisk aktywny';
    this.button = false;
  }

  constructor() { }

}
