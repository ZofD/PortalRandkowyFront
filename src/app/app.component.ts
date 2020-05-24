import { Component } from '@angular/core';
import {templateJitUrl} from '@angular/compiler';
import {getTemplateUrl} from 'codelyzer/util/ngQuery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PortalRandkowy';

  onSubmit() {

  }
}
