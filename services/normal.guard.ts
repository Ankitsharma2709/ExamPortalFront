import { Injectable, inject} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
@Injectable({
  providedIn:'root'
})


class NormalGuard{
  constructor(private login:LoginService, private router: Router){}
  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):boolean{
      if(this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL'){
        return true;
      }
      this.router.navigate(['login']);
      return false;

    }
  
}

export const normalGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
  return inject(NormalGuard).canActivate(route,state);
};
