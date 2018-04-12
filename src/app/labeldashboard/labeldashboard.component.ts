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
import { OpenDialogImageComponent } from '../open-dialog-image/open-dialog-image.component';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-labeldashboard',
  templateUrl: './labeldashboard.component.html',
  styleUrls: ['./labeldashboard.component.css']
})
export class LabeldashboardComponent implements OnInit {

  // remainder
    private timerSubscription: any = null;
    private lastActivityTime: Date;
    private lastActivityTime1: Date;
    private lastActivityTime2: Date;
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    addOnBlur: boolean = true;
    separatorKeysCodes = [ENTER, COMMA];
    fruits = [

    ];
   // public chipData;
   chipData: Array<Object>[];
    showFiller = false;
    isClassVisible: false;
    public dashDataFirst;
    public currentlabel;
    public myData=[];
    note:string;
     private subscription: ISubscription;
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

    constructor(private rd: Renderer2,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

    }




    ////////////////////////////////read the data by calling service method//////////////////////////////////////////////

    ngOnInit():void {

      var a=localStorage.getItem("label");
      this.currentlabel=a;
      console.log(this.currentlabel);

      let timer = Observable.timer(1000, 1000);
       this.timerSubscription = timer.subscribe((t:any) => {
       this.timerTommarrowExecuted();
       this.timerTodayExecuted();
       this.timerMondayExecuted();
     });
       //
      this.refreshNotes();
    }



    remove1(data)
    {
       var data1 = { is_deleted: data.is_deleted ?  'false' : 'true'}
       this.subscription=this.commonService.updateData('update/'+data._id,data1)
                                           .subscribe(model => {
                                            });
      this.refreshNotes();
   }
   remove(data): void {
    var chip=
    {
      note_chip: null,
    }
       this.subscription=this.commonService.updateData('update/' + data._id, chip)
       .subscribe(model => {
        this.refreshNotes();
      });


      var chip1=
      {
        reminder: null
      }

      this.subscription=  this.commonService.updateData('update/' + data._id, chip1)
        .subscribe(model => {
          this.refreshNotes();
        });
  }


  //////////////////////////////////////////////////////////////////////////////
    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
      //unsubscribe the subscription in ngDestroy
      if (this.timerSubscription != null)
          this.timerSubscription.unsubscribe();
          this.subscription.unsubscribe();
    }

    toggle1() {
     this.show = !this.show;

    }


    submitNote()
    {

          this.subscription= this.commonService.postServiceData('create/Note',this.model)
                                               .subscribe(model => {
                                                this.refreshNotes();
                                             });
    }


  copyNote(model)
  {
    this.subscription= this.commonService.postServiceData('create/Note',model)
                                         .subscribe(model => {
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
    this.subscription=  this.commonService.deleteData('delete/'+id)
                         .subscribe(
                          data => {
                           this.refreshNotes();
                          });
    }
    //refresh notes here
    refreshNotes()
    {
     this.subscription=this.commonService.getData('readTodos')
                                       .subscribe(response => {
                      if (response) {
                          this.dashDataFirst = response.reverse();
                       }
         })
    }

     trashNotes(data)
     {
       var data1 = { is_deleted: data.is_deleted ?  'false' : 'true'}
       this.subscription=this.commonService.updateData('update/'+data._id,data1)
                         .subscribe(model => {
                          this.refreshNotes();
     });

     }


     archiveNotes(data)
     {
       var data1 = { is_archieved: data.is_archieved ? 'false' : 'true'}
      this.subscription= this.commonService.updateData('update/'+data._id,data1)
                                           .subscribe(model => {
        this.refreshNotes();
       });
  }



     pinNotes(data)
     {
       var data1 = { is_pinned: data.is_pinned ? 'false' : 'true'}

       this.subscription=this.commonService.updateData('update/'+data._id,data1)
                                           .subscribe(model => {
                                            this.refreshNotes();
                                          });
    }

     unpinNotes(data)
     {
       var data1 = { is_pinned: data.is_pinned ? 'false' : 'true'}

      this.subscription= this.commonService.updateData('update/'+data._id,data1)
       .subscribe(model => {
        this.refreshNotes();
        });

     }

     changeColor(data,color)
        {     var data1 =

            {   note_color: color }

     this.subscription=this.commonService.updateData('update/'+data._id,data1)
                                              .subscribe(model => {
          this.refreshNotes();
        });
    }

   chipShowtoday(data, chip1)
      {
        var chip =
      {
        note_chip: chip1
      }

      this.subscription=  this.commonService.updateData('update/' + data._id, chip)
       .subscribe(model => {
        this.refreshNotes();
      });


    //
   var reminder1 =
  {
    reminder: this.lastActivityTime
  }

  this.subscription=  this.commonService.updateData('update/' + data._id, reminder1)
                                         .subscribe(model => {
                                          this.refreshNotes();
                                        });

    }

    chipShowTommarrow(data, chip1)
  {
      var chip =
    {
      note_chip: chip1
    }

      this.subscription=this.commonService.updateData('update/' + data._id, chip)
                                          .subscribe(model => {
      this.refreshNotes();
    });
  //
  var reminder1 =
  {
  reminder: this.lastActivityTime1
  }

  this.subscription=this.commonService.updateData('update/' + data._id, reminder1)
                                      .subscribe(model => {
                                      this.refreshNotes();
                                  });

  }


  chipShowMonday(data, chip1)
  {
        var chip =
       {
          note_chip: chip1
      }

    this.commonService.updateData('update/' + data._id, chip)
                      .subscribe(model => {
                      this.refreshNotes();
                    });

  var reminder2 =
  {
  reminder: this.lastActivityTime2
  }
  this.subscription=    this.commonService.updateData('update/' + data._id, reminder2)
                        .subscribe(model => {
                         this.refreshNotes();
                        });

   }

     submitReminder(data)
 {
       var reminder1 =
     {
       reminder: this.model.reminder
     }
this.subscription=  this.commonService.updateData('update/' + data._id, reminder1)
                         .subscribe(model => {
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


    }
