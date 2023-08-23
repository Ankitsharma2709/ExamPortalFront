import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
//making the class injectable aywhere 
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    //importing loginservice in order to access the functionality of the login service class
    constructor(private login: LoginService){

    }
    // the intercept is a built in mthod of intercepto interface forninterepting and handlin http req and res .
    // req: represents the incoming http request made by our frontend and next is for passing the req to next interceptor in the chainor , if no other interceptros are 
    // present then tt he final client . it allows the interceptor to pass th modified request down the chain
    // to reach the server or to receive the respose from the server
    // the obersravle<httpEcent<any>> : the obersavle represent steweam of evemts that the method can produce . in this case, the httpevent 
    // is a generic type that represents different types of events related to http communicaton such as req, res,or errorresponse.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add th jwt token which is store in localstorage
        let authReq = req;
        const token = this.login.getToken();
        console.log("inside the interceptor");
        if(token!=null){ 
            authReq = authReq.clone({
                setHeaders:{Authorization: `Bearer ${token}`}
            });

        }
        return next.handle(authReq);


    }

}

export const authInterceptorProviders=[
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
];

   