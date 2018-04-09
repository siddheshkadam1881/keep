import { Component, OnInit,VERSION, Renderer2} from '@angular/core';
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
import {NgModule, forwardRef, ViewChild, ElementRef} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import { Location } from '@angular/common';
import { OpenDialogImageComponent } from '../open-dialog-image/open-dialog-image.component';
import { OpenDialogAddLabelComponent } from '../open-dialog-add-label/open-dialog-add-label.component';


// import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



// remainder
  private timerSubscription: any = null;
  private lastActivityTime: Date;
  private lastActivityTime1: Date;
  private lastActivityTime2: Date;
//CHIP EVENT
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  checked = false;
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
  public Labels;
  public labelchip;
    public myData=[];
  note:string;

   title:string;
   values:any={};
   model:any={};
   item:any={};
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

  constructor(private location: Location,private rd: Renderer2,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
//read label
    this.commonService.getData('readLabel').subscribe(response => {
      if (response) {
        console.log(response);
        // items.slice().reverse();
         this.Labels = response;
      }
    },
    error => console.log("Error while retrieving"));

  }




  ////////////////////////////////read the data by calling service method//////////////////////////////////////////////

  ngOnInit():void {

    let timer = Observable.timer(1000, 1000);
     this.timerSubscription = timer.subscribe((t:any) => {
     this.timerTommarrowExecuted();
     this.timerTodayExecuted();
     this.timerMondayExecuted();
   });
     //
        this.commonService.getData('readTodos').subscribe(response => {
          if (response) {
            //console.log(response.data);
            // items.slice().reverse();
             this.dashDataFirst = response;
              //console.log(this.dashDataFirst.reverse());
          }
        },
          error => console.log("Error while retrieving"));
      //

      this.commonService.getData('readLabel').subscribe(response => {
        if (response) {
          //console.log(response);
          // items.slice().reverse();
           this.Labels = response;
        }
      },
        error => console.log("Error while retrieving"));
  }


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


//////////////////////////////////////////////////////////////////////////////
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    //unsubscribe the subscription in ngDestroy
    if (this.timerSubscription != null)
        this.timerSubscription.unsubscribe();
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

          this.commonService.postServiceData('create/Note',this.model)
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
   this.commonService.postServiceData('create/Note',model)
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
   height:'450px',
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

      console.log(data);
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

    chipShowtoday(data, chip1)
  {
      var chip =
    {
      note_chip: chip1
    }



    // var currentDate = new Date();
    // currentDate.setHours(currentDate.getHours() + 16);  //addition 24 hours  from current date
    // this.lastActivityTime = currentDate;

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


  //
 var reminder1 =
{
  reminder: this.lastActivityTime
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

  chipShowTommarrow(data, chip1)
{
    var chip =
  {
    note_chip: chip1
  }
  // var currentDate = new Date();
  // currentDate.setHours(currentDate.getHours() + 16);  //addition 24 hours  from current date
  // this.lastActivityTime = currentDate;

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
//
var reminder1 =
{
reminder: this.lastActivityTime1
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


chipShowMonday(data, chip1)
{
  var chip =
{
  note_chip: chip1
}
// var currentDate = new Date();
// currentDate.setHours(currentDate.getHours() + 16);  //addition 24 hours  from current date
// this.lastActivityTime = currentDate;

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
//
var reminder2 =
{
reminder: this.lastActivityTime2
}
console.log(data,reminder2);
// this.chipData=data;
//console.log(this.chipData);
this.commonService.updateData('update/' + data._id, reminder2)
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


   private timerTommarrowExecuted(): void
   {
     var tomorrow = new Date();
     var currentDate = new Date();
     tomorrow.setDate(currentDate.getDate()+1);
     tomorrow.setHours(8);//set setHours
     tomorrow.setMinutes(0);
     tomorrow.setMilliseconds(0);
     // currentDate.setHours(currentDate.getHours() - 2);  //subtract 2 hours or 120 minutes from current date
     this.lastActivityTime1 = tomorrow;
  }
  private timerTodayExecuted(): void
  {
    var currentDate = new Date();
    //tomorrow.setDate(currentDate.getDate()+1);
    currentDate.setHours(20);//set setHours
    currentDate.setMinutes(0);
    currentDate.setMilliseconds(0);
    // currentDate.setHours(currentDate.getHours() - 2);  //subtract 2 hours or 120 minutes from current date
    this.lastActivityTime = currentDate;
 }
 private timerMondayExecuted(): void
 {
   var currentDate = new Date();
    var Monday = new Date();
   Monday.setDate(currentDate.getDate()+6);
   Monday.setHours(20);//set setHours
   Monday.setMinutes(0);
   Monday.setMilliseconds(0);
   // currentDate.setHours(currentDate.getHours() - 2);  //subtract 2 hours or 120 minutes from current date
   this.lastActivityTime2 = Monday;
}


    openDialogImage(data): void
    {

    let dialogRef = this.dialog.open(OpenDialogImageComponent, {
     width: '300px',
     height:'300px',
     data: data
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
    });
    }


    /*********** label dialog use for add label  **********/
     openDialogAddLabel(data): void
     {
     console.log(data);
     let dialogRef = this.dialog.open( OpenDialogAddLabelComponent, {
      width: '300px',
      height:'300px',
      data: data
     });

     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     });
     }

     labelSubmit(label,data):void
     {
           console.log(label.title);
           console.log(data);
           this.checked = !this.checked;
       var labeldata =
     {
       label : label.title
     }

       // var current;
       // current=current+labeldata;
       // console.log(current);


       this.commonService.updateData('update/' + data._id,labeldata)
      .subscribe(model => {
       console.log(model);
       // this.toastr.success( 'Success!');
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

     //remove label
     remove1(data,labelchip,chip_id): void
     {



          console.log(chip_id);


       //this.orders = this.orders.filter(order => order.food_id !== food.id);
         this.commonService.updateData('update/'+data._id,data.label)
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

  ApplyFilters(isValid: boolean,data) {
   var datas  = this.Labels.filter(function (data1) { return data1.selected == true });
    if (!isValid) return;
   for(var a=0; a<datas.length;a++)
    {

     var labeldata ={
     label_ids :datas[a]._id
   }

   this.commonService.updateData('update/' + data._id,labeldata)
  .subscribe(model => {
   console.log(model);
   // this.toastr.success( 'Success!');
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

createNewlabel(data)
{
   console.log(this.model);
    this.commonService.postServiceData('createLabel',this.model)
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

refreshLabel()
{
this.commonService.getData('readLabel').subscribe(response => {
 if (response) {
 console.log(response);
// items.slice().reverse();
 this.Labels = response;
 location.reload();
 }
},
error => console.log("Error while retrieving"))
}



  }
