import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
loginData = {
  username: '',
  password:'',

};
//Read the below note first please it will mke you understand the concept of jwt authentication quite well.


// so it is like when i first try to login config class will intercept and permit the generatetoken 
//request then after generating the token and sending it as a response server will let me access the user da
//shboard after that if i tried to login again i send the token with bearer and authorization prefix and config class will
// intercept and validate the token and then let me in .in short it is like when i  buy a ticket for movie i will go in and after that i can do in and out using that ticket 
  

  constructor(private snack:MatSnackBar, private login:LoginService, private router: Router){
    

  }
  ngOnInit(): void {
    
  }
  formSubmit(){
    console.log("login btn clicked");
    if(this.loginData.username.trim()==''||this.loginData.username==null){
        this.snack.open("Username is required !!",'',{
          duration:3000,
        });
        return;
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("Password is required !!",'',{
        duration:3000,
      });
      return;
   }
  
   //request the server to generate token and call the generateToken method whicwill generatethe toke by sending the request to the srrver
   this.login.generateToken(this.loginData).subscribe({
    //the data contains jo bhi response aara
    next: (data:any)=>{
      console.log('success');
      console.log(data);
      
         //login...
         //ye call krte hi localstorage mein token set kr dia
         this.login.loginUser(data.token);
         //this will helpin storing current user in local storage
         this.login.getCurrentUser().subscribe({
          next:(user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect...Admin: admin-dashboard
            //redirect...Normal: normal-dashboard
            if(this.login.getUserRole()=="ADMIN"){
              //admin dashboard
              //ye waala method reload krega page
              // window.location.href='/admin';
              this.router.navigate(['admin'])
            }else if(this.login.getUserRole()=='NORMAL'){
              //norml user dashboard
              //ye waala methods reload krega page
              // window.location.href='/user';
              //ye bs component pr le jaaega no reloading 
              //ab jaise hi navigate hoga to sidha saari quiz load kara dega 
              this.router.navigate(['user/0']);
            }else{
              this.login.logout();
              
            }

          }
         });



    },
    error: (err:any)=>{
      console.log('error!');
      console.log(err);
      this.snack.open("Invalid credential",'',{
        duration:3000
      });
      
    }
   });
    

 

  }

  


}
