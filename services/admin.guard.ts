import { Injectable, inject} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
// @Injectable({
//   providedIn: 'root'
// })

// class AdminGuard{
//   constructor(private login:LoginService, private router: Router){}
//   canActivate(
//     route: ActivatedRouteSnapshot, 
//     state: RouterStateSnapshot):boolean{
//       if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN'){
//         return true;
//       }
//       this.router.navigate(['login']);
//       return false;
//     }
// }


// export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {
  
//   return inject(AdminGuard).canActivate(route,state);
// };

@Injectable({
  providedIn:'root'
})
class AdminGuard{
  constructor(private login: LoginService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):boolean{
    if(this.login.isLoggedIn() && this.login.getUserRole()=='ADMIN'){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}

export const adminGuard:CanActivateFn=(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean=>inject(AdminGuard).canActivate(route, state)