import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
 options: FormGroup;
private subscription: ISubscription;
 hide = true;
 invalidCredentialMsg: string;
 token:string;
  constructor(private route: ActivatedRoute, private router: Router ,private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef)
   {
     this.token = route.snapshot.params['token']
  }

  submitpassword(data) {
          this.subscription=this.commonService.postServiceData('reset_password/'+ this.token,data)
                                              .subscribe(
                                               data => {
                                                this.router.navigate(['/signin']);
                                             });
  }
  ngOnDestroy(): void {
          this.subscription.unsubscribe();
    }




}
