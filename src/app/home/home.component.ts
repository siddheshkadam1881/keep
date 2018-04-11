import { Component,OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommonComponent } from '../common/common.component';
import { GridService } from '../services/grid.service';
import { OpenDialogImageComponent } from '../open-dialog-image/open-dialog-image.component';
import { OpenDialogProfileComponent } from '../open-dialog-profile/open-dialog-profile.component';
import { OpenDialogLabelComponent } from '../open-dialog-label/open-dialog-label.component';
import { OpenDialogAddLabelComponent } from '../open-dialog-add-label/open-dialog-add-label.component';
import { FilterPipe} from '../services/filter.pipe';
import { Location } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//import {HttpModule} from '@angular/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  showFiller = false;

   isClassVisible: false;
  public Users;
  public Labels;
  public currentlabel;
  public dashDataFirst;
  // public currentlabel1;
  public myData=[];
  note:string;
   title:string;
   values:any={};
   model:any={};
//notes array
   notes: Array<any>;
  //hide and see logic
  public show:boolean = false;
  public show1:boolean = false;
  responseStatus:Object= [];
  status:boolean ;
  //hide and show grid
  showHide:boolean;
  showtoggle1:boolean;
  loading = false;
  returnUrl: string;
  invalidCredentialMsg: string;
  mobileQuery: MediaQueryList;

   fillerNav = Array(1).fill(0).map((_, i) => `Nav Item ${i + 1}`);

   fillerContent = Array(1).fill(1).map(() =>'');
       // `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       //  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       //  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       //  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       //  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

   private _mobileQueryListener: () => void;

   constructor(private location: Location,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
     this.mobileQuery = media.matchMedia('(max-width: 600px)',);
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);

    }

////////////////////////////////read the data by calling service method//////////////////////////////////////////////

   ngOnInit():void {
      this.refreshNotes();
      // this.refreshlabels();

      //
      this.commonService.getData('readActiveUser').subscribe(response => {
        if (response) {
          //console.log(response);
          // items.slice().reverse();
           this.Users = response;
        }
      },
        error => console.log("Error while retrieving"))

   }


   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
   }


   openDialogImage(data): void
   {

   let dialogRef = this.dialog.open(OpenDialogProfileComponent, {
    width: '500px',
    height:'500px',
    data: data
   });

   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   });
   }

//refresh profile here...
refreshProfile()
{
  this.commonService.getData('readActiveUser').subscribe(response => {
    if (response) {
      //console.log(response.data);
      // items.slice().reverse();
      this.Users = response;

    }
  },
    error => console.log("Error while retrieving"))
}

openDialoglabel(data): void
{
console.log(data);
let dialogRef = this.dialog.open(OpenDialogLabelComponent, {
 width: '300px',
 height:'300px',
 data: data
});

dialogRef.afterClosed().subscribe(result => {
 console.log('The dialog was closed');
});
}

logout() {
localStorage.removeItem("token");
this.router.navigate(['/signin']);
}

refreshNotes()
{
this.commonService.getAllNotes().subscribe(response => {
 if (response) {
    this.dashDataFirst = response;
     // console.log(this.dashDataFirst.reverse());
 }
},
 error => console.log("Error while retrieving"))
}


// refreshlabels()
// {
// this.subscription=this.commonService.getAllabels().subscribe(response => {
//  if (response) {
//     this.dashDataFirst = response;
//      // console.log(this.dashDataFirst.reverse());
//    }
// },
//  error => console.log("Error while retrieving"))
// }
 openLabel(data)
 {
    localStorage.setItem('label',data.title);
    var currentlabels=localStorage.getItem("label");
    this.currentlabel=currentlabels;
    console.log(this.currentlabel);
    this.commonService.postServiceData('label/'+ data._id,data).subscribe(
    data =>{
    this.router.navigate(['/home/Label/'+data._id]);
    err =>{
    this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
    () => console.log('get label')
    };
    location.reload();
   });
   var data1 =
    {
      currentlabel: data.title
    }
    console.log(data1);
    this.commonService.updateData('updateLabel/' + data._id, data1)
   .subscribe(model => {
    err => {
    console.log(err);
    this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
    () => console.log('Request Completed')
    };
  });
}

}
