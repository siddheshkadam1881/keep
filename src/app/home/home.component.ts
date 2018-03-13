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

   constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
     this.mobileQuery = media.matchMedia('(max-width: 600px)',);
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);



   }

////////////////////////////////read the data by calling service method//////////////////////////////////////////////

   ngOnInit():void {
      //
      this.commonService.getData('readActiveUser').subscribe(response => {
        if (response) {
          console.log(response);
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










//
//    toggle1() {
//     this.show = !this.show;
//
// }



// toggle1() {
//  this.showtoggle1= !this.showtoggle1;
//
// }

 //
 // submitNote() {
 //
 //   console.log(this.model);
 //
 //          // console.log("submit Post click happend " + this.model.name)
 //
 //           this.commonService.postServiceData('create',this.model)
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
 //         this.refreshNotes();
 //    });
 // }


 // copyNote(model)
 // {
 //
 //    console.log(model);
 //    //let notes=new myData();
 //    this.commonService.postServiceData('create',model)
 //    .subscribe(model => {
 //       console.log(model);
 //
 //      // this.toastr.success( 'Success!');
 //      // this.router.navigate(['/home']);
 //
 //    //console.log(this.responseStatus = data),
 //    err =>{
 //             console.log(err);
 //            //this.toastr.error(err);
 //            this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
 //            () => console.log('Request Completed')
 //         //  this.toastr.error(err);
 //
 //                  };
 //                  this.refreshNotes();
 //             });
 // }

 logout() {
 localStorage.removeItem("token");
 this.router.navigate(['/signin']);
}

openDialog(data): void {
  let dialogRef = this.dialog.open(CommonComponent, {
    width: '400px',
    height:'400px',
    data: data
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}









 }
