import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { BackendApiService } from '../services/backend-api.service';
import { ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent implements OnInit {
invalidCredentialMsg:string;
  constructor(private route: ActivatedRoute, private router: Router ,private commonService:BackendApiService,public toastr: ToastsManager, vcr: ViewContainerRef)
  {
    // this.token = route.snapshot.params['token']
   }

  ngOnInit() {
    // console.log(this.tokens);
    // localStorage.setItem('token',this.token);
    // this.router.navigate(['/home']);
   //  this.commonService.postServiceData('generateToken',this.model)
   //    .subscribe(model => {
   //       console.log(model);
   //
   //      // this.toastr.success( 'Success!');
   //      // this.router.navigate(['/home']);
   //    //console.log(this.responseStatus = data),
   //    err =>{
   //             console.log(err);
   //             //this.toastr.error(err);
   //             this.invalidCredentialMsg = 'Invalid Credentials. Try again.';
   //            () => console.log('Request Completed')
   //            //  this.toastr.error(err);
   //      };
   // });
  }

}
