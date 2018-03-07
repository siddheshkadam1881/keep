import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommonComponent } from '../common/common.component';
import { GridService } from '../services/grid.service';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {

  //CHIP EVENT
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    chipData: Array<Object>[];
    fruits = [];

  showFiller = false;

   isClassVisible: false;
  public dashDataFirst;
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
     this.mobileQuery = media.matchMedia('(max-width: 600px)');
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);



   }



   //////////////////////////////////////////////////////////

   add(event: MatChipInputEvent): void {
      let input = event.input;
      let value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.fruits.push({ name: value.trim() });
      }

      // Reset the input value
      if (input) {
        this.chipData=[];

      }
    }


  remove(data): void {
   var chip=
   {
     note_chip: null
   }
            console.log(chip);
   // this.chipData=data;
   //console.log(this.chipData);
   this.commonService.updateData('update/' + data._id, chip)
     .subscribe(model => {
       console.log(model);

       // this.toastr.success( 'Success!');
       // this.router.navigate(['/home']);
       //console.log(this.responseStatus = data),
       err => {
         console.log(err);
         //this.toastr.error(err);
         this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
         () => console.log('Request Completed')

         //  this.toastr.error(err);
       };
       this.refreshNotes();
     });


     var chip1=
     {
       reminder: null
     }
              console.log(chip1);
     // this.chipData=data;
     //console.log(this.chipData);
     this.commonService.updateData('update/' + data._id, chip1)
       .subscribe(model => {
         console.log(model);

         // this.toastr.success( 'Success!');
         // this.router.navigate(['/home']);
         //console.log(this.responseStatus = data),
         err => {
           console.log(err);
           //this.toastr.error(err);
           this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
           () => console.log('Request Completed')

           //  this.toastr.error(err);
         };
         this.refreshNotes();
       });
 }


  ////////////////////////////////read the data by calling service method//////////////////////////////////////////////

   ngOnInit():void {
      //
         this.commonService.getData('readTodos').subscribe(response => {
           if (response) {
             //console.log(response.data);
             // items.slice().reverse();
              this.dashDataFirst = response.reverse();
               console.log(this.dashDataFirst.reverse());
           }
         },
           error => console.log("Error while retrieving"))
   }

  //////////////////////////////////////////////////////////
   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
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




  //refresh notes here
  refreshNotes()
  {
  this.commonService.getData('readTodos').subscribe(response => {
    if (response) {
      //console.log(response.data);
      // items.slice().reverse();
       this.dashDataFirst = response.reverse();
        console.log(this.dashDataFirst.reverse());
    }
  },
    error => console.log("Error while retrieving"))
  }

  //delete note forever
  deleteNote(id){
  console.log(id);
  //this.commonService.deleteData('delete/'+id).subscribe(
  this.commonService.deleteData('delete/'+id).subscribe(

  data => {
   console.log("note delete");
   //console.log(data);
   //this.toastr.success( 'Success!', 'timeout: 6000');

   //console.log(this.responseStatus = data),
   err =>{
   console.log(err);
   //this.toastr.error(err);
   this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
   () => console.log("Note updated !!!")
   //this.toastr.error(err);
  //this.ngOnDestroy()
  };
  this.refreshNotes();
  });
  }
//color notes
  changeColor(data,color)
     {     var data1 =

         {   note_color: color }
          console.log(data1);
       this.commonService.updateData('update/'+data._id,data1)
       .subscribe(model => {
          console.log(model);

         // this.toastr.success( 'Success!');
         // this.router.navigate(['/home']);
       //console.log(this.responseStatus = data),
       err =>{
                console.log(err);
               //this.toastr.error(err);
               this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
               () => console.log('Request Completed')

            //  this.toastr.error(err);
     };
     this.refreshNotes();
     });

     }


  archiveNotes(data)
  {
    var data1 = { is_archieved: data.is_archieved ?  'false' : 'true'}
       console.log(data1);
    this.commonService.updateData('update/'+data._id,data1)
    .subscribe(model => {
       console.log(model);

      // this.toastr.success( 'Success!');
      // this.router.navigate(['/home']);
    //console.log(this.responseStatus = data),
    err =>{
             console.log(err);
            //this.toastr.error(err);
            this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
            () => console.log('Request Completed')

         //  this.toastr.error(err);

  };
  this.refreshNotes();
 });

}

chipShow(data, chip1)
{
  var chip =
{
  note_chip: chip1
}
  console.log(chip);
// this.chipData=data;
//console.log(this.chipData);
  this.commonService.updateData('update/' + data._id, chip)
 .subscribe(model => {
  console.log(model);
  // this.toastr.success( 'Success!');
  // this.router.navigate(['/home']);
  //console.log(this.responseStatus = data),
  err => {
  console.log(err);
  //this.toastr.error(err);
  this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
  () => console.log('Request Completed')
    //  this.toastr.error(err);
  };
  this.refreshNotes();
});
}
submitReminder(data)
{
 var reminder1 =
{
 reminder: this.model.reminder
}
 console.log(data,reminder1);
// this.chipData=data;
//console.log(this.chipData);
 this.commonService.updateData('update/' + data._id, reminder1)
.subscribe(model => {
 console.log(model);
 // this.toastr.success( 'Success!');
 // this.router.navigate(['/home']);
 //console.log(this.responseStatus = data),
 err => {
 console.log(err);
 //this.toastr.error(err);
 this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
 () => console.log('Request Completed')
   //  this.toastr.error(err);
 };
 this.refreshNotes();
});

}
}
