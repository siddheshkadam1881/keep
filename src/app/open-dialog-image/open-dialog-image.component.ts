import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-open-dialog-image',
  templateUrl: './open-dialog-image.component.html',
  styleUrls: ['./open-dialog-image.component.css']
})
export class OpenDialogImageComponent implements OnInit {
  fileToUpload: File = null;
    invalidCredentialMsg: string;
    public dashDataFirst;
    private subscription: ISubscription;
    constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    { }

    ngOnInit()
    {

    }
    ngOnDestroy(): void {

       this.subscription.unsubscribe();
    }

      handleFileInput(event, data) {
      var image = event.target.files[0];
      let formObj = new FormData();
      formObj.append("image",image)
      this.subscription=this.commonService.updateData('update/' + data._id, formObj)
                        .subscribe(model => {
                         this.commonService.loadAllNotes();
                         }
           );
   }
 }
