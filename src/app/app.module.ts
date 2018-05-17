import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";
import { NgModule, LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import { Http ,HttpModule} from '@angular/http'
import io from 'socket.io-client';
import { BackendApiService } from './services/backend-api.service';
import { FilterPipe} from './services/filter.pipe';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ForgetComponent } from './forget/forget.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';
import {LayoutModule} from '@angular/cdk/layout';
import { CommonComponent } from './common/common.component';
import { AuthGuard,LoggedInAuthGuard} from './auth/index';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrashComponent } from './trash/trash.component';
import { ArchieveComponent } from './archieve/archieve.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatetimepickerModule,MatNativeDatetimeModule,MAT_DATETIME_FORMATS } from "@mat-datetimepicker/core";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {MatChipsModule} from '@angular/material/chips';
import { OpenDialogImageComponent } from './open-dialog-image/open-dialog-image.component';
import { OpenDialogProfileComponent } from './open-dialog-profile/open-dialog-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OpenDialogLabelComponent } from './open-dialog-label/open-dialog-label.component';
import { LabeldashboardComponent } from './labeldashboard/labeldashboard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OpenDialogAddLabelComponent } from './open-dialog-add-label/open-dialog-add-label.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
//import { DummyComponent } from './dummy/dummy.component';
import { SocialLoginModule } from 'angularx-social-login';
import { UserService } from './services/user.service';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { NoteFilterPipe } from './note-filter.pipe';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { LabelCheckedMapFilterPipe } from './label-checked-map-filter.pipe';
import { SearchfilterPipe } from './searchfilter.pipe';
import { OpenDialogcollabratorComponent } from './open-dialogcollabrator/open-dialogcollabrator.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { ColorDirectiveDirective } from './color-directive.directive';
import {NavbarDirective} from './directives/navbar.directive';
import {MatRadioModule} from '@angular/material/radio';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('209419629801960')
  }
]);


  export function provideConfig() {
  return config;
}


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent,canActivate : [LoggedInAuthGuard] },
  // { path: 'note', component: NoteComponentComponent,canActivate :  [LoggedInAuthGuard] } ,
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent,
   canActivate: [ AuthGuard ],
   children: [
       { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
       { path: 'Dashboard', component: DashboardComponent },
       { path: 'Trash', component: TrashComponent },
       { path: 'Archieve', component: ArchieveComponent },
       { path: 'Label/:id', component: LabeldashboardComponent }
    ],
},
  { path: 'forgetpass/:token', component: ForgetpasswordComponent },
  //{ path: 'forgetpass', component: ForgetpasswordComponent },
  { path: 'forget', component: ForgetComponent },
  { path: '**', component: PagenotfoundComponent }

];



@NgModule({
  declarations:
  [
    FilterPipe,
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ForgetpasswordComponent,
    ForgetComponent,
    CommonComponent,
    DashboardComponent,
    TrashComponent,
    ArchieveComponent,
    OpenDialogImageComponent,
    OpenDialogProfileComponent,
    OpenDialogLabelComponent,
    LabeldashboardComponent,
    PagenotfoundComponent,
    OpenDialogAddLabelComponent,
    NoteFilterPipe,
    LabelCheckedMapFilterPipe,
    SearchfilterPipe,
    OpenDialogcollabratorComponent,
    ColorDirectiveDirective,
    NavbarDirective
  ],
  imports: [
    SocialLoginModule,
    MatCheckboxModule,
    ImageCropperModule,
    MatChipsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
     MultiselectDropdownModule,

    //MatNativeDatetimeModule,
    //MatDatepickerModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    LayoutModule,
    MatListModule,
    MatSidenavModule,
    MatFormFieldModule,
    BrowserModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ToastModule.forRoot(),
    BrowserModule,
    MatRadioModule,
    // RouterModule.forChild(routes),
    SocialLoginModule.initialize(config)
  ],
  entryComponents: [
     CommonComponent,
     OpenDialogImageComponent,
     OpenDialogProfileComponent,
     OpenDialogLabelComponent,
     OpenDialogAddLabelComponent,
     OpenDialogcollabratorComponent
   ],

  providers: [UserService, { provide: AuthHttp, useFactory: getAuthHttp, deps: [Http] },BackendApiService, AuthGuard, LoggedInAuthGuard ,{ provide: AuthServiceConfig, useFactory: provideConfig }, {
      provide: LOCALE_ID,
      useValue: "de-DE"
    },

   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
