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
id:string;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<CommonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    {
       this.id = route.snapshot.params['id']
     }

    ngOnInit():void {

              this.commonService.getData('readTodos/'+this.id).subscribe(response => {
                if (response) {
                  console.log(response);
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

}
