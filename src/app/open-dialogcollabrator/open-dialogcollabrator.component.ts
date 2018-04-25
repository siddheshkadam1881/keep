import { Component, OnInit } from '@angular/core';

import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-open-dialogcollabrator',
  templateUrl: './open-dialogcollabrator.component.html',
  styleUrls: ['./open-dialogcollabrator.component.css']
})
export class OpenDialogcollabratorComponent implements OnInit {
  private subscription: ISubscription;
   public currentUser;
   public response;
   public notes;
   model:any={};
   arrayOne:Array<string> = [];
   // constructor() { }
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogcollabratorComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
  { }


  ngOnInit() {
    this.refreshProfile();
    this.readNotes();
  }
  //refresh profile here...
  refreshProfile()
{
  this.commonService.getprofile()
                    .subscribe(response => {
                                            if (response)
                                            {
                                             this.currentUser = response;
                                            }
                                        })
 }

   readNotes():void {
     this.subscription = this.commonService.getAllNotes()
                                           .subscribe(response => {
                                              if (response) {
                                               this.notes = response;
                                                //console.log(response);

                                                // arrayOne
                                               }
                                             },
                                              error => console.log("Error while retrieving"))
 }
 submitCollabrator(data)
 {
    //console.log(this.model);
  var collaborate = {
      collabrator_ids:this.model.collabrator_ids
   }
   //console.log(collaborate);
   this.subscription=this.commonService.updateData('updateNote/' + data._id,collaborate)
                                       .subscribe(
                                                   response =>{
                                                             this.response=response;
                                                          });
                                        //this.refreshNotes();



 }

  ngOnDestroy(): void {
                         this.subscription.unsubscribe();
                     }
}
