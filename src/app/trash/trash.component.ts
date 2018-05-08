import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommonComponent } from '../common/common.component';
import { GridService } from '../services/grid.service';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  showFiller = false;

   isClassVisible: false;
  public dashDataFirst;
  public myData=[];
  note:string;
private subscription: ISubscription;
   title:string;
   values:any={};
   model:any={};
  //notes array
   notes: Array<any>;
  //hide and see logic
  public show:boolean = false;
  public show1:boolean = false;
  responseStatus:Object= [];
  status:boolean ;

  loading = false;
  returnUrl: string;
  invalidCredentialMsg: string;
  mobileQuery: MediaQueryList;

   fillerNav = Array(1).fill(0).map((_, i) => `Nav Item ${i + 1}`);

   fillerContent = Array(1).fill(1).map(() =>'');
       // `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       //  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       //  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       //  voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       //  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

   private _mobileQueryListener: () => void;

   constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
     this.mobileQuery = media.matchMedia('(max-width: 600px)');
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);

   }


   ngOnInit():void {
     //this.readNotes();
      this.refreshNotes();
   }

   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
     this.subscription.unsubscribe();

   }

  openDialog(data): void {
    let dialogRef = this.dialog.open(CommonComponent, {
      width: '400px',
      height:'400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




  //refresh notes here
  refreshNotes()
  {
    //this.commonService.loadAllLabels();
    // this.refreshImage();
    this.subscription=  this.commonService.getAllNotes()
                                          .subscribe(response => {
                                                   if (response) {
                                                                   this.dashDataFirst = response;
                                                                }
                                           })
  }

  //delete note forever
  deleteNote(id)
  {
         this.commonService.deleteData('deletenote/'+id)
                           .subscribe(
                             model =>  {

                                        this.model=model;
                                          this.refreshNotes();
                                      }
                                  );

  }

  trashNotes(data)
  {
    var data1 = { is_deleted: data.is_deleted ?  'false' : 'true'}
     this.commonService.updateData('updateNote/'+data._id,data1)
                       .subscribe(model => {
                                            this.refreshNotes();
                                          });



  }

}
