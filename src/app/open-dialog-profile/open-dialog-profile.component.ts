import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-open-dialog-profile',
  templateUrl: './open-dialog-profile.component.html',
  styleUrls: ['./open-dialog-profile.component.css']
})
export class OpenDialogProfileComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileToUpload: File = null;
  invalidCredentialMsg: string;
    callback:any='';
    public dashDataFirst;
    private subscription: ISubscription;
    constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    { }


ngOnInit()
{
  this.refreshProfile();

}
ngOnDestroy(): void {
   this.subscription.unsubscribe();
}


//change event function use for move rectangular crop
fileChangeEvent(event: any): void {
  this.imageChangedEvent = event;
}
//got cropped image
imageCropped(image: string) {
  this.croppedImage = image;


}
imageLoaded() {
}

//this function use for save crop image to backend...
saveImage(image, data)
{

  var image = this.croppedImage;
  var image1 = this.dataURItoBlob(image);
  let formObj = new FormData();
  formObj.append("image", image1)
  this.subscription=this.commonService.updateData('activeUser/' + data._id, formObj)
                                        .subscribe(model => {

                                            // location.reload();
                                          this.refreshProfile();
                                          this.imageChangedEvent = event;
                                        });
}
//choose image from file here...
handleFileInput(event, data) {
  console.log(data)
  var image = event.target.files[0];
  let formObj = new FormData();
  formObj.append("image", image)
  this.subscription=this.commonService.updateData('activeUser/' + data._id, formObj)
                                                        .subscribe(model => {
                                                          this.refreshProfile();
                                                          this.imageChangedEvent = event;
                                                        });
}

//predefine function use for base 64 to image file
dataURItoBlob(dataURI) {

  var byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab]);
  return bb;
}

//refresh profile here...
refreshProfile()
{
  this.subscription=this.commonService.getprofile()
                                      .subscribe(response => {
                                      if (response) {
                                      this.dashDataFirst = response;
                                      }
                  })
                }
}
