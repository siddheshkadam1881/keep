import { Component,OnInit,ViewChild,Input} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef} from '@angular/core';
import { BackendApiService } from '../services/backend-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CommonComponent } from '../common/common.component';
import { GridService } from '../services/grid.service';
import { OpenDialogImageComponent } from '../open-dialog-image/open-dialog-image.component';
import { OpenDialogProfileComponent } from '../open-dialog-profile/open-dialog-profile.component';
import { OpenDialogLabelComponent } from '../open-dialog-label/open-dialog-label.component';
import { OpenDialogAddLabelComponent } from '../open-dialog-add-label/open-dialog-add-label.component';
import { FilterPipe} from '../services/filter.pipe';
import { Location } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ISubscription } from "rxjs/Subscription";
import { Pipe, PipeTransform } from '@angular/core';
import { Output, EventEmitter} from '@angular/core'
import {FormsModule, FormGroup, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  showFiller = false;
   @ViewChild(DashboardComponent)
   private Dashboard: DashboardComponent;
   brotherForm: FormGroup;
   inputFormControl: FormControl;
   isClassVisible: false;
  public Users;
  public Labels;
  public currentlabel;
  public dashDataFirst;
  public usersArray;
  color: string;
  private subscription: ISubscription;
  public myData=[];
  note:string;
  searchText:string;
  public searchNote;
   title:string;
   public urlImage="http://localhost:3000/"
  // values:any={};
   model:any={};
  //notes array
   notes: Array<any>;
  //hide and see logic
  public show:boolean = false;
  public show1:boolean = false;
  responseStatus:Object= [];
  status:boolean ;
  //hide and show grid
  showHide:boolean;
  showtoggle1:boolean;
  loading = false;
  returnUrl: string;
  invalidCredentialMsg: string;
  mobileQuery: MediaQueryList;
    values = '';
   fillerNav = Array(1).fill(0).map((_, i) => `Nav Item ${i + 1}`);

   fillerContent = Array(1).fill(1).map(() =>'');
  showStyle: false;

   private _mobileQueryListener: () => void;

   constructor(private builder: FormBuilder,private location: Location,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private commonService:BackendApiService,private route: ActivatedRoute, private router: Router,public dialog: MatDialog) {
     this.mobileQuery = media.matchMedia('(max-width: 600px)',);
     this._mobileQueryListener = () => changeDetectorRef.detectChanges();
     this.mobileQuery.addListener(this._mobileQueryListener);
      this.commonService.myMethod(this.searchNote);
   //obeservale bother varibles
      this.inputFormControl = new FormControl();
      this.brotherForm = this.builder.group({
      inputFormControl: this.inputFormControl
       });

    }



   ngOnInit():void {
     this.getAllUsersPofile();
      this.refreshProfile();
      this.brotherForm.valueChanges
                       .subscribe(
                          (formData) => {
                           this.commonService.onDataChangeInBrother(formData.inputFormControl);
                      });
   }

   changeCSS(){
    // console.log("hii");
     this.commonService.toggleView();
   }

   ngOnDestroy(): void {
     this.mobileQuery.removeListener(this._mobileQueryListener);
   }


   openDialogImage(data): void
   {
    let dialogRef = this.dialog.open(OpenDialogProfileComponent, {
                         width: '500px',
                         height:'500px',
                        data: data
                     });
             dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
         });
   }

      refreshProfile()
    {
      this.subscription=  this.commonService.getprofile()
                                            .subscribe(response => {
                                                       if (response)
                                                    {
                                                           this.Users = response;
                                                    }
                              })
     }

     openDialoglabel(data): void
     {
            let dialogRef = this.dialog.open(OpenDialogLabelComponent, {
             width: '300px',
             height:'300px',
             data: data
            });
            dialogRef.afterClosed().subscribe(result => {
             console.log('The dialog was closed');
        });
    }

    getAllUsersPofile()
  {
    this.subscription=  this.commonService.getAllUsers("getAllUser")
                                           .subscribe(response => {
                                                     if (response)
                                                  {
                                                      this.usersArray=response;
                                                         //this.Users = response;
                                                  }
                            })
   }

     logout()
     {
          localStorage.removeItem("token");
          this.router.navigate(['/signin']);
     }


  }
