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

   public currentUser;
   // constructor() { }
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogcollabratorComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
  { }

  ngOnInit() {
    this.refreshProfile()
  }
  //refresh profile here...
  refreshProfile()
{
  this.subscription=  this.commonService.getprofile()
                                        .subscribe(response => {
                                                   if (response)
                                                {
                                                       this.currentUser = response;
                                                       console.log(this.currentUser);
                                                }
                          })
 }
}
