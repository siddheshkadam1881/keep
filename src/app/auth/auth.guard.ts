import { Injectable } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('token')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    //  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //      if (localStorage.getItem('Authorization')) {
    //          // logged in so return true
    //          return true;
    //      }
    //       // not logged in so redirect to login page with the return url
    //       this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //       return false;
    //  }
}

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!localStorage.getItem('token')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home']);
        return false;
    }
}
