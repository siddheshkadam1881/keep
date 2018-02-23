import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
public dashDataFirst;
invalidCredentialMsg: string;
  id:any;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<CommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    {
      // this.id = this.route.params['id'];
     }

    ngOnInit():void {

              this.commonService.getData('readTodos').subscribe(response => {
                if (response) {
                  //console.log(response.data);
                  // items.slice().reverse();
                   this.dashDataFirst = response.reverse();
                  //console.log(this.dashDataFirst.reverse());
                }
              },
                error => console.log("Error while retrieving"))
        }

  onNoClick(): void {
     this.dialogRef.close();
   }

   updateNote(data,id){

   console.log(data,id);
   this.commonService.updateData('update/'+id,data).subscribe(
   data => {
    this.dialogRef.close();
    //console.log("note updated ");
    //console.log(data);
    //this.toastr.success( 'Success!', 'timeout: 6000');

    //console.log(this.responseStatus = data),
    err =>{
    console.log(err);
    //this.toastr.error(err);
    this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
    () => console.log("Note updated !!!")
    //this.toastr.error(err);

  };
});
}

deleteNote(id){
console.log(id);
this.commonService.deleteData('delete/'+id).subscribe(
data => {
 console.log("note delete");
 //console.log(data);
 //this.toastr.success( 'Success!', 'timeout: 6000');

 //console.log(this.responseStatus = data),
 err =>{
 console.log(err);
 //this.toastr.error(err);
 this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
 () => console.log("Note updated !!!")
 //this.toastr.error(err);
//this.ngOnDestroy()
};
});
}









}
