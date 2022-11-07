import { Component } from '@angular/core';
import {MDCRipple} from '@material/ripple';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Redbricks_Frontend';
constructor(private route:Router){
}
}
