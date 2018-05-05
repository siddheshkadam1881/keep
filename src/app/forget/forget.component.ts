import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BackendApiService } from '../services/backend-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";
@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent  {
  private subscription: ISubscription;
  invalidCredentialMsg: string;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
   return this.email.hasError('required') ? 'You must enter a value like john@abc.com' :
       this.email.hasError('email') ? 'Not a valid email' :
           '';
  }

  showWarning() {
        this.toastr.warning('after enter ur mail id check ur email', 'Alert!');
      }
  constructor(private route: ActivatedRoute, private router: Router ,private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef)
     {
      this.toastr.setRootViewContainerRef(vcr);
     }
  forgetUser(data) {
          this.subscription= this.commonService.postServiceData('forgot_password',data)
                                                .subscribe(
                                                  data => {
                                                    this.showWarning();
                                                    setTimeout (() => {
                                                    this.router.navigate(['/forget']);
                                                 }, 1000)
                                                 });


                                              //    this.showWarning();
                                              //    setTimeout (() => {
                                              //    this.router.navigate(['/forget']);
                                              // }, 2000)

     }

ngOnDestroy(): void {
        this.subscription.unsubscribe();

  }
}
