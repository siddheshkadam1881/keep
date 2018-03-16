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
<<<<<<< HEAD
import { Location } from '@angular/common';
=======

>>>>>>> 33fb8eb6b8c3dbaed18c60c1dc6e68387a7f4e13
import { DashboardComponent } from '../dashboard/dashboard.component';
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

     this.commonService.getData('readLabel').subscribe(response => {
       if (response) {
         console.log(response);
         // items.slice().reverse();
          this.Labels = response;
       }
     },
     error => console.log("Error while retrieving"));


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



//////////////////////////////////////////////////////////
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

<<<<<<< HEAD
logout() {
localStorage.removeItem("token");
this.router.navigate(['/signin']);
=======

>>>>>>> 33fb8eb6b8c3dbaed18c60c1dc6e68387a7f4e13
}
 openLabel(data)
 {

   console.log(data)
   this.commonService.postServiceData('label/'+ data._id,data).subscribe(
     data => {
          // this.router.navigate(['/home']);
          //this.toastr.success( 'Success!', 'timeout: 6000');
          this.router.navigate(['/home/Label/'+data._id]);
          //console.log(this.responseStatus = data),
          err =>{
          console.log(err);
          //this.toastr.error(err);
          this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
          () => console.log('get label')
          // this.toastr.error(err);
     };

   });
 }

<<<<<<< HEAD


}
=======
// //create labels
// createLabel(data)
// {
//   console.log(this.data);
//
//          // console.log("submit Post click happend " + this.model.name)
//
//           this.commonService.postServiceData('createLabel',this.model)
//           .subscribe(model => {
//              console.log(model);
//
//             // this.toastr.success( 'Success!');
//             // this.router.navigate(['/home']);
//
//           //console.log(this.responseStatus = data),
//           err =>{
//                    console.log(err);
//                   //this.toastr.error(err);
//                   this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
//                   () => console.log('Request Completed')
//
//                //  this.toastr.error(err);
//
//         };
//         //this.refreshNotes();
//    });
// }
>>>>>>> 33fb8eb6b8c3dbaed18c60c1dc6e68387a7f4e13
