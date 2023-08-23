import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  // this app-navbar is tag for bavbar and wenever we use it in html just use this tag.
  selector: 'app-navbar',  
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user:any;
  constructor(public login: LoginService, private router:Router){
    this.user='';
  }
  ngOnInit(): void {
    this.user = this.login.getUser();
 
  }
  
  public logout(){
    this.login.logout();
    this.router.navigate(['login']);
  }

}
