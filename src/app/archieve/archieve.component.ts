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
import { ISubscription } from "rxjs/Subscription";
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
    private subscription: ISubscription;
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

   private _mobileQueryListener: () => void;

   constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
     this.mobileQuery = media.matchMedia('(max-width: 600px)');
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);
   }



   ngOnInit():void {
        this.readNotes();
       this.refreshNotes();
   }

   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
      this.subscription.unsubscribe();
   }


      add(event: MatChipInputEvent): void {
         let input = event.input;
         let value = event.value;


         if ((value || '').trim()) {
           this.fruits.push({ name: value.trim() });
         }

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
        .subscribe(model => {
          this.refreshNotes();
        });


        var chip1=
        {
          reminder: null
        }

      this.subscription=  this.commonService.updateData('updateNote/' + data._id, chip1)
          .subscribe(model => {
            this.refreshNotes();
          });
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
  this.subscription=this.commonService.getData('readTodos')
                                      .subscribe(response => {
                                                                    if(response)
                                                                    {
                                                                      this.dashDataFirst = response;
                                                                    }
                                                            })
  }

  //delete note forever
      deleteNote(id)
    {
    this.subscription= this.commonService.deleteData('delete/'+id)
                                         .subscribe( data => {
                                           this.readNotes();
                                          this.refreshNotes();
                                         });
   }
       changeColor(data,color)
       {
         var data1 =
         {   note_color: color }
          this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                              .subscribe(model => {
                                                                    this.refreshNotes();
                                                                    this.readNotes();
                                                                  });
          this.refreshNotes();
      }


    archiveNotes(data)
  {
    var data1 = { is_archieved: data.is_archieved ?  'false' : 'true'}

     this.subscription=this.commonService.updateData('updateNote/'+data._id,data1)
                                          .subscribe(model => {
                                                                this.readNotes()
                                                             });
       this.refreshNotes();
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

chipShow(data, chip1)
{
          var chip =
       {
              note_chip: chip1
       }

         this.subscription= this.commonService.updateData('updateNote/' + data._id, chip)
                                              .subscribe(model => {
                                                this.readNotes();
                                               this.refreshNotes();
                                              });
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
                                                        this.readNotes();
                                                });
                this.refreshNotes();

   }
}
