import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  public dashDataFirst;
  invalidCredentialMsg: string;
  id:any;
  model:any={};
  private subscription: ISubscription;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<CommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    {

    }
    ngOnInit():void {

              this.refreshNotes();
        }

   ngOnDestroy(): void {

           this.subscription.unsubscribe();
     }

      onNoClick(): void {
      this.dialogRef.close();
     }

      updateNote(data,id)
    {
      this.subscription = this.commonService.updateData('update/'+id,data)
                                            .subscribe(
                                              data => {
                                              });
     this.refreshNotes();
    }

     deleteNote(id)
     {
          this.subscription=this.commonService.deleteData('delete/'+id)
                           .subscribe(data => {
                           });
          this.refreshNotes();
    }
//refresh purpose
   refreshNotes()
  {
    this.subscription=this.commonService.getData('readTodos')
                          .subscribe(response => {
          if (response) {
          this.dashDataFirst = response.reverse();
          }
      })
  }

  changeColor(data,color)
   {
       var note_color =
            {   note_color: color }
            this.subscription = this.commonService.updateData('update/'+data._id,note_color)
                                                  .subscribe(model => {
                         });
           this.refreshNotes();
   }
       chipShow(data, chip1)
      {
          var chip =
         {
          note_chip: chip1
         }
      this.subscription=this.commonService.updateData('update/' + data._id, chip)
                                          .subscribe(model => {
                    });
      this.refreshNotes();
    }


    submitReminder(data)
{
     var reminder1 =
    {
     reminder: this.model.reminder
    }

       this.subscription = this.commonService.updateData('update/' + data._id, reminder1)
                                            .subscribe(model => {
                                            });
      this.refreshNotes();

  }

}
