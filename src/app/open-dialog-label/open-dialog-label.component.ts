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
  model:any={};
  imgsrc2:string="assets/icon/add.svg";
  imgsrc3:string="assets/icon/clear.svg";
  imgSrc: string = "assets/icon/label.svg";
  imgSrc1: string = "assets/icon/done.svg";
  showHide1:Boolean;
  invalidCredentialMsg: string;
  public Labels;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogLabelComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
  { }

  ngOnInit() {
   this.refreshLabel();
  }

   onMouseOut()
   {
    this.imgSrc = "assets/icon/label.svg";
   }

   onMouseOver()
   {
       this.imgSrc="assets/icon/delete.svg";
   }

   changeShowStatus()
   {
     this.showHide1 = !this.showHide1;
   }

   renameLabel(data)
   {
     var data1 =
      {
        title: data.title
      }
      // console.log(data1);
      this.commonService.updateData('updateLabel/' + data._id, data1)
     .subscribe(model => {
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

  deleteLabel(id)
{
   console.log(id);
     this.commonService.deleteData('deleteLabel/'+id)
     .subscribe(model => {
       this.refreshLabel();
     }
   );
}

   createLabel(data)
   {

     console.log(this.model);


          this.commonService.postServiceData('createLabel',this.model)
             .subscribe(model => {
                                  console.log(model);


                             this.refreshLabel();
                        },
                        err =>{
                                 console.log(err);
                                //this.toastr.error(err);
                                this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
                                () => console.log('Request Completed')

                      });
   }

   refreshLabel()
   {
    this.commonService.getAllLabels().subscribe(response => {
     if (response) {
     this.Labels = response;
      // location.reload();
    }
   },
   error => console.log("Error while retrieving"))
   }

}
