import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ForgetComponent } from './forget/forget.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';
import {LayoutModule} from '@angular/cdk/layout';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CommonComponent } from './common/common.component';
import {MatDialogModule} from '@angular/material/dialog';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgetpass/:token', component: ForgetpasswordComponent },
  //{ path: 'forgetpass', component: ForgetpasswordComponent },
  { path: 'forget', component: ForgetComponent }
];


const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com')
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('209419629801960')
  }
]);

export function provideConfig() {
  return config;
}





@NgModule({
  declarations:
  [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ForgetpasswordComponent,
    ForgetComponent,
    CommonComponent

  ],
  imports: [
  //  io
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
    SocialLoginModule.initialize(config)
  ],
  entryComponents: [

     CommonComponent
   ],

  providers: [BackendApiService, { provide: AuthServiceConfig, useFactory: provideConfig } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
