import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-open-dialog-label',
  templateUrl: './open-dialog-label.component.html',
  styleUrls: ['./open-dialog-label.component.css']
})
export class OpenDialogLabelComponent implements OnInit {
  imgSrc: string = "assets/icon/label.svg";
  imgSrc1: string = "assets/icon/done.svg";
  invalidCredentialMsg: string;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogLabelComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
  { }

  ngOnInit() {
  }
   onMouseOut()
   {
    this.imgSrc = "assets/icon/label.svg";
   }

   onMouseOver()
   {
       this.imgSrc="assets/icon/delete.svg";
   }


   renameLabel(data)
   {
     var data1 = { title: data.title }
     console.log(data1);
     this.commonService.updateData('updateLabel/' + data._id, data1)
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
      this.refreshLabel();
    });

}

    refreshLabel(){}

}
