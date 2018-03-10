import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-open-dialog-image',
  templateUrl: './open-dialog-image.component.html',
  styleUrls: ['./open-dialog-image.component.css']
})
export class OpenDialogImageComponent implements OnInit {
  fileToUpload: File = null;
    invalidCredentialMsg: string;
    public dashDataFirst;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    { }

  ngOnInit()
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

  handleFileInput(event, data) {
    console.log(data)
    var image = event.target.files[0];
// this.chipData=data;
//console.log(this.chipData);

  let formObj = new FormData();
    formObj.append("image",image)
    this.commonService.updateData('update/' + data._id, formObj)
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

}
