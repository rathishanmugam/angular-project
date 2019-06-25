import {Injectable} from "@angular/core";
import {canActivate} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {promise} from "selenium-webdriver";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map,take} from "rxjs/operators";
@Injectable({providedIn:'root'})
export class AuthGuard implements canActivate {
  constructor(private authService:AuthService,private router:Router){}
  canActivate(route:ActivatedRouteSnapshot,
              router:RouterStateSnapshot):boolean |UrlTree | promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
return this.authService.user.pipe(take(1),map(user => {
  const isAuth = !!user;
  if(isAuth){
    return true;
  }
  return this.router.createUrlTree(['/auth']);
}));

  }
}
