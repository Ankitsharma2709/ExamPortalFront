import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl1 = "http://localhost:8082";

  constructor(private http: HttpClient) { 
    
    
  }
  //get the details of current user whic is loggen in currently

  public getCurrentUser(){
    return this.http.get(`${this.baseUrl1}/current-user`);
  }
  //generate Token
  //this will call backend to generate token 

  public generateToken(loginData: any){

    return this.http.post(`${this.baseUrl1}/generate-token`,loginData);
  }

  

  //login user: set token in localstorage
  //this will set the token in our local storage
  public loginUser(token: string){
    localStorage.setItem("token",token);
    return true;
  }



  //islogin: user is logged in ornot
  //check whether user is logged in or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr==''|| tokenStr==null){
      return false;

    }else{
      return true;
    }
  }

  //logoout: remove token from local storage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token 
  public getToken(){
    return localStorage.getItem('token');
  }

  //set userDetails
  //now we want ki server se baar baar call na bhejni ode just ek baar lo=gin kia and use get krlia and store kr lia

  public setUser(user:any){
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user roll
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;

  }

  
  
}
