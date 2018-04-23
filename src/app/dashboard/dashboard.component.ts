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
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { RequestOptions } from '@angular/http';
import { FilterPipe} from '../services/filter.pipe';
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
  //var storageId;
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  separatorKeysCodes = [ENTER, COMMA];
  check = false;
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
  public searchNotes;
  reqLabelDto:any={};
  public myData=[];
  note:string;
  checked : false;
   title:string;
   values:any={};
   model:any={};
   item:any={};
   status:any={};
   statusClass : string="grid-view";
   //notes array
   notes: Array<any>;
  //hide and see logic
  public show:boolean = false;
  public show1:boolean = false;
  responseStatus:Object= [];
  private subscription: ISubscription;
  //status:boolean ;
  searchData= '';
  //hide and show grid
  showHide:boolean;
  showtoggle1:boolean;
  loading = false;
  returnUrl: string;
  invalidCredentialMsg: string;
  mobileQuery: MediaQueryList;
  fillerNav = Array(1).fill(0).map((_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array(1).fill(1).map(() =>'');

  private _mobileQueryListener: () => void;

  constructor(private location: Location,private rd: Renderer2,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
//read label
    this.commonService.getData('readLabel').subscribe(response => {
      if (response) {
      }
    },
    error => console.log("Error while retrieving"));
    this.commonService.myMethod$.subscribe((model) =>
                                 {
                                    this.model = model; // And he have data here too!
                                    console.log(this.model);
                                 });



  }




  ////////////////////////////////read the data by calling service method//////////////////////////////////////////////

  ngOnInit():void {

    let timer = Observable.timer(1000, 1000);
     this.timerSubscription = timer.subscribe((t:any) => {
     this.timerTommarrowExecuted();
     this.timerTodayExecuted();
     this.timerMondayExecuted();
    // labelClick(labelObj , noteObj);
   });
   this.refreshNotes();
    this.readNotes();
    this.refreshLabel();
    this.gridView();
    this.dataTake();

  }


  dataTake(){
            this.searchData = localStorage.getItem("searchData");


             // this.subscription = this.commonService.getData('searchTodos/'+ this.searchData)
             //                                        .subscribe(data =>{
             //                                        // this.ngOnInit();
             //                                          console.log(data);
             //                                          this.readNotes();
             //                                      });

            // this.subscription = this.commonService.getData('searchTodos/'+ this.searchData)
            //                                        .subscribe(searchNotes =>{
            //                                        this.searchNotes=searchNotes;
            //                                         console.log("siddheshwar " ,searchNotes);
            //                                      });


       }




  labelClick(labelObj , noteObj):void{

    if(labelObj.checked === null || labelObj.checked === undefined)
      labelObj.checked = this.isLabelChecked(labelObj , noteObj);
      labelObj.checked = labelObj.checked ? false : true;


  }

  isLabelChecked( labelObj , noteObj ):boolean{
    let flag = false;
    if(noteObj.label_ids && noteObj.label_ids.length >0 && noteObj.label_ids.indexOf(labelObj._id) >= 0 ){
      flag = true;
    }
    // labelObj.checked = flag;
    return flag;
  }

     gridView()
   {
      this.commonService.getStatus().subscribe((status)=>{
       this.statusClass = status? "grid-view":"list-view";
        this.readNotes();
        });

      this.refreshNotes();
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

  this.subscription=this.commonService.updateData('updateNote/' + data._id, chip)
                                      .subscribe(model =>
                                        {
                                          this.model=model;
                                          this.readNotes();
                                        }
                                      );
      this.refreshNotes();

       var chip1=
     {
      reminder: null
     }


       this.subscription=this.commonService.updateData('updateNote/' + data._id, chip1)
                                           .subscribe(model =>
                                            {
                                              this.model = model;
                                              this.readNotes();
                                            });
        this.refreshNotes();
  }



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

  readNotes():void {
      this.subscription = this.commonService.getAllNotes()
                                            .subscribe(response => {
                                               if (response) {
                                                 this.dashDataFirst = response;
                                                }
                                              },
                                               error => console.log("Error while retrieving"))
  }

  submitNote() {

          this.subscription=this.commonService.postServiceData('create/Note',this.model)
                                              .subscribe(
                                               model =>
                                                {
                                                this.model = model;
                                                this.readNotes();
                                                }
                                            );
               this.refreshNotes();
      }

  copyNote(model)
  {

     this.subscription=this.commonService.postServiceData('create/Note',model)
                                         .subscribe(model => {
                                          this.model = model;
                                          this.readNotes();
                                          }
                                          );
                                          this.refreshNotes();
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
  });
  }

  deleteNote(id)
  {
    this.subscription= this.commonService.deleteData('delete/'+id)
                                         .subscribe(
                                          model => {
                                                     this.model = model;
                                                     this.readNotes();
                                           });
     this.refreshNotes();
  }

  refreshNotes()
  {
    this.commonService.loadAllLabels();
    // this.refreshImage();
    this.subscription=  this.commonService.getAllNotes()
                                          .subscribe(response => {
                                                  if (response) {
                                                                  this.dashDataFirst = response;
                                                                }
                                          })
  }



   trashNotes(data)
   {
       var data1 = { is_deleted: data.is_deleted ?  'false' : 'true'}
       this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                            .subscribe(
                                             model => {
                                             this.model = model;
                                             this.readNotes();
                                             });
        this.refreshNotes();
   }


   archiveNotes(data)
   {
     var data1 = { is_archieved: data.is_archieved ? 'false' : 'true'}

    this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                         .subscribe(model =>  {
                                           this.model = model;
                                                      this.readNotes();
                                                  }
                                     );
    this.refreshNotes();
  }



   pinNotes(data)
   {
     var data1 = { is_pinned : data.is_pinned ? 'false' : 'true'}

     this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                          .subscribe(model =>  {
                                           this.model = model;
                                           this.readNotes();
                                           });
     this.refreshNotes();
   }

   unpinNotes(data)
   {
        var data1 = { is_pinned: data.is_pinned ? 'false' : 'true'}
        this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                            .subscribe(model =>  {
                                            this.model = model;
                                            this.readNotes();
                                            }
                                            );
        this.refreshNotes();
    }


   changeColor(data,color)
    {
      var data1 = { note_color: color }
      this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                          .subscribe(model =>
                                           {
                                            this.model = model;
                                            this.readNotes();
                                           }
                                          );
      this.refreshNotes();
      }

    chipShowtoday(data, chip1)
  {
      var chip =
    {
      note_chip: chip1
    }

      this.subscription=this.commonService.updateData('updateNote/' + data._id, chip)
                                         .subscribe(model =>
                                           {
                                            this.model = model;
                                            this.readNotes();
                                           }
                                        );

    var reminder1 =
   {
    reminder: this.lastActivityTime
   }

  this.subscription=this.commonService.updateData('updateNote/' + data._id, reminder1)
                                       .subscribe(model =>
                                         {
                                          this.model = model;
                                          this.readNotes();
                                         }
                                      );
  this.refreshNotes();
}

  chipShowTommarrow(data, chip1)
  {
    var chip =
  {
    note_chip: chip1
  }

    this.subscription=this.commonService.updateData('updateNote/' + data._id, chip)
                                         .subscribe(model =>
                                           {
                                            this.model = model;
                                            this.readNotes();
                                           }
                                        );


      var reminder1 =
      {
      reminder: this.lastActivityTime1
      }

   this.subscription=this.commonService.updateData('updateNote/' + data._id, reminder1)
                                        .subscribe(model =>
                                          {
                                           this.model = model;
                                           this.readNotes();
                                          }
                                        );
    this.refreshNotes();
}


chipShowMonday(data, chip1)
{
       var chip =
        {
          note_chip: chip1
        }
      this.subscription=this.commonService.updateData('updateNote/' + data._id, chip)
                                         .subscribe(model => {
                                                   this.model = model;
                                                   this.readNotes();
                                                }
                                            );


      var reminder2 =
      {
      reminder: this.lastActivityTime2
      }

     this.subscription=this.commonService.updateData('updateNote/' + data._id, reminder2)
                                    .subscribe(model => {
                                    this.model = model;
                                    this.readNotes();
                                    }
                                    );
            this.refreshNotes();
}

   submitReminder(data)
   {
     var reminder1 =
   {
     reminder: this.model.reminder
   }

     this.subscription=this.commonService.updateData('updateNote/' + data._id, reminder1)
                                          .subscribe(model => {
                                          this.model = model;
                                          this.readNotes();
                                          }
                                         );
     this.refreshNotes();
 }

  removelabel(data,label)
  {

    this.reqLabelDto.check=false;
     var labeldata = {
                       label :null
                    }
    this.commonService.updateData('updateNote/'+ data._id,labeldata)
                        .subscribe(res => {
                                            this.readNotes();
                                          });
     this.refreshNotes();
     //this.labelClick(label , data);
  }


   private timerTommarrowExecuted(): void
   {
     var tomorrow = new Date();
     var currentDate = new Date();
     tomorrow.setDate(currentDate.getDate()+1);
     tomorrow.setHours(8);//set setHours
     tomorrow.setMinutes(0);
     tomorrow.setMilliseconds(0);
     this.lastActivityTime1 = tomorrow;
  }
  private timerTodayExecuted(): void
  {
    var currentDate = new Date();
    currentDate.setHours(20);//set setHours
    currentDate.setMinutes(0);
    currentDate.setMilliseconds(0);
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
    });
    }


    /*********** label dialog use for add label  **********/
     openDialogAddLabel(data): void
     {

     let dialogRef = this.dialog.open( OpenDialogAddLabelComponent, {
      width: '300px',
      height:'300px',
      data: data
     });

     dialogRef.afterClosed().subscribe(result => {
     });
     }

     checkSelectlabel(check,label,data)
     {

             // label.checked = label.checked ? false : true;


             if(check){
                         this.reqLabelDto.check=true;
                         //localStorage.setItem('storageId', this.reqLabelDto.check);
                         var labeldata = {
                                           label_ids :label
                                          }
                         this.commonService.updateData('updateNote/'+ data._id,labeldata)
                                            .subscribe(res => {
                                             });
                     }
             else
                   {
                         this.reqLabelDto.check=false;
                         //localStorage.setItem('storageId', this.reqLabelDto.check);

                          var labeldata = {
                                            label_ids :null
                                          }
                          this.commonService.updateData('updateNote/'+ data._id,labeldata)
                                           .subscribe(res => {
                                            });
                    }

         // this.labelClick(label,data)


     }



createNewlabel(data)
{
    this.subscription=this.commonService.postServiceData('createLabel',this.model)
                                         .subscribe(
                                          model =>
                                           {
                                             this.model=model;
                                             this.readNotes();
                                           }
                                        );
     this.refreshNotes();
  }

refreshLabel()
{
  this.subscription=  this.commonService.getAllLabels()
                                        .subscribe(response => {
                                        if (response)
                                        {
                                           this.Labels = response;
                                        }
                                  })
}

submitlabel(check,label,data)
{

    if(check){
      this.reqLabelDto.check=true;
      //localStorage.setItem('storageId', this.reqLabelDto.check);

      var labeldata = {
                        label :label.title
                       }
      this.commonService.updateData('updateNote/'+ data._id,labeldata)
                        .subscribe(res =>
                          {
                              this.readNotes();
                          });

  }
  else
   {
          this.reqLabelDto.check=false;
        //  localStorage.setItem('storageId, this.reqLabelDto.check);

          var labeldata ={
              label :null
          }
          this.commonService.updateData('updateNote/'+ data._id,labeldata)
                            .subscribe(res =>
                                      {

                                        this.readNotes();
                                      });


                                    //  label.checked = label.checked ? false : true;
          this.refreshNotes();
  }


}

  ApplyFilters(isValid: boolean,data) {

   var selectedLables  = this.Labels.filter(function (data1) { return data1.selected == true });
   var mapped = selectedLables.map((labelObj)=> labelObj._id);

    var labeldata ={
   label_ids :mapped
  }

    if (!isValid) return;

   // this.subscription=this.commonService.postServiceData('labelToNoteHandler/' + data._id + '/' + mapped + "/", {},{operation:"add"})

   this.subscription=this.commonService.updateData('updateNote/' + data._id,labeldata)
                                       .subscribe(
                                         model =>{
                                            this.model=model;
                                         });
                                        this.refreshNotes();
}
}
