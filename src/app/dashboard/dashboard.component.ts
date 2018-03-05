import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommonComponent } from '../common/common.component';
import { HomeComponent } from '../home/home.component';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

//CHIP EVENT
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  fruits = [
    // { name: 'Lemon' },
    // { name: 'Lime' },
    // { name: 'Apple' },
  ];
 // public chipData;
 chipData: Array<Object>[];
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
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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
              note_chip: []
            }
           console.log(chip);
           // this.chipData=data;
           //console.log(this.chipData);
           this.commonService.updateData('update/'+data._id,chip)
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

    /////////////////////////////////////////////////////////////////////

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggle1() {
   this.show = !this.show;

  }
  // toggle1() {
  //  this.showtoggle1= !this.showtoggle1;
  //
  // }


  submitNote() {

  console.log(this.model);

         // console.log("submit Post click happend " + this.model.name)

          this.commonService.postServiceData('create',this.model)
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


  copyNote(model)
  {

   console.log(model);
   //let notes=new myData();
   this.commonService.postServiceData('create',model)
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
  deleteNote(id){
  console.log(id);
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

   trashNotes(data)
   {
     var data1 = { is_deleted: data.is_deleted ?  'false' : 'true'}
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
     var data1 = { is_archieved: data.is_archieved ? 'false' : 'true'}
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



   pinNotes(data)
   {
     var data1 = { is_pinned: data.is_pinned ? 'false' : 'true'}
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

   unpinNotes(data)
   {
     var data1 = { is_pinned: data.is_pinned ? 'false' : 'true'}
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

         chipShow(data,chip1)
         {
           var chip=
           {
             note_chip: chip1
           }
          console.log(chip);
          // this.chipData=data;
          //console.log(this.chipData);
          this.commonService.updateData('update/'+data._id,chip)
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


  }
