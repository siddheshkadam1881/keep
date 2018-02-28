import { Component} from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { ViewChild } from '@angular/core';
//import * from '../home/home.component';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent  {

@ViewChild('mainNav') public mainNav;
  constructor(public sideService:SidebarService) {
  this.sideService.sidenav = this.mainNav;
}

}
