import{HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
// export class UserService {


//   constructor(
//     private http:HttpClient,

//   ) { }

  // add user
  // public adduser(user:any){
  //   let baseUrl = "http://localhost:8082";
    
    
  //   return this.http.post(`${baseUrl}/user`,user,{headers: new HttpHeaders({
  //     'Authorization':  `${baseUrl}`

  //   })});
  // }


  export class UserService {

    private baseUrl = "http://localhost:8082";
  
    constructor(private http: HttpClient) { }
  
    addUser(user: any) {
      
  
      return this.http.post(`${this.baseUrl}/user/`, user);
    }

    getUserDetails(){
      return this.http.get(`${this.baseUrl}/user/details`);
    }
  }
 
  
  
  
  
  
  

