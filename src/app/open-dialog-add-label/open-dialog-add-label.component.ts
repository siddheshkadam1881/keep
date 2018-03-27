import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-open-dialog-add-label',
  templateUrl: './open-dialog-add-label.component.html',
  styleUrls: ['./open-dialog-add-label.component.css']
})
export class OpenDialogAddLabelComponent implements OnInit {
  public Labels;
  constructor(private route: ActivatedRoute, private router: Router,public dialogRef: MatDialogRef<OpenDialogAddLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private commonService:BackendApiService)
    { }


  ngOnInit() {
    this.commonService.getData('readLabel').subscribe(response => {
      if (response) {
        //console.log(response);
        // items.slice().reverse();
         this.Labels = response;
      }
    },
      error => console.log("Error while retrieving"))
  }


}
