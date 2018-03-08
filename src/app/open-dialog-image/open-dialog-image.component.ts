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
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    { }

  ngOnInit() {
  }



  handleFileInput(event, data) {
    console.log(data)
    var image = event.target.files[0];

    var image1 =
  {
    image: image
  }
    console.log(data,image1);
// this.chipData=data;
//console.log(this.chipData);
    this.commonService.updateData('update/' + data._id, image1)
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
  });


 }

}
