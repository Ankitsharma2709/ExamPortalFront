import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack: MatSnackBar){}


  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
}




  ngOnInit(): void {
    
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null){
      // alert('user is required!!')
      this.snack.open('username is required!!','',{
        duration:3000,
        
      });
      return;
    }

    //add user
    // this.userService.adduser(this.user).subscribe(
    //   (data)=>{
    //     //success
    //     console.log(data)
    //     alert('success');
    //   },
    //   (error)=>{
    //     //error
    //     console.log(error);
    //     alert('something went wrong');
    //   }
    // )

    this.userService.addUser(this.user).subscribe({
      next: (user:any) => {
        // Save the user data here (e.g., send it to a server, save it in the local storage, etc.)
        // console.log('User data:', user);
      }, 
      error: (err:any) => {
        // Handle errors here (e.g., show an error message, log the error, etc.)
        // console.error('Error:', err);
        this.snack.open('something went wring','',{
          duration:3000,
        })
      },
      complete: () => {
        // console.log('Subscription complete');
        Swal.fire('Success','user is registered', 'success');


      }
    });
    
    
    
  }
}
