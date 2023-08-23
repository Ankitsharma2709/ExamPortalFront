import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit{
  cid:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService){}
  ngOnInit(): void {
    // now what it will do is everytime jab router change hga to wo subscribe krega and data new oad krta rhega 
    // and jo bhi category choose krenge uski id lelega and usse related quizzes ham load kar lenge
    
    this._route.params.subscribe({
      next: (params:any)=>{
        this.cid= params['cid'];
        console.log(params);
        if(this.cid==0){
      
          this._quiz.getActiveQuizzes().subscribe({
          next: (data:any)=>{
            this.quizzes=data;
            console.log(this.quizzes);
          },
          error: (err:any)=>{
            console.log(err); 
            Swal.fire('Error!','error in loading the data','error');
    
          }
        });
        }else{
          console.log("load speific quiz");
          this._quiz.getActiveQuizzesOfCategory(this.cid).subscribe({
            next: (data:any)=>{
              this.quizzes=data;
              console.log(this.quizzes);
            },
            error: (err:any)=>{
              console.log(err);
              Swal.fire('Error!!','Error in loading the data!','error');
            }
          })
        }
      }
    })
    
    
  }

}
