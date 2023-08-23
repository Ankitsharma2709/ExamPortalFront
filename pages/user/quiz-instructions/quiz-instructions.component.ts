import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit{
  qid:any;
  quiz:any;
  constructor(private _quiz:QuizService, private _route:ActivatedRoute, private _router:Router){}
  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    console.log(this.qid);
    this._quiz.geetingSingleQuiz(this.qid).subscribe({
      next: (data:any)=>{
        this.quiz=data;
        
      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('Error!','error in loading data','error');

      }
    })
    
  }
  startQuiz(){
    Swal.fire({
      title: 'Do you want to Start?',
      
      showCancelButton: true,
      confirmButtonText: 'Yes',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._router.navigate(['/start-quiz/'+this.qid])
       
      } else if (result.isDenied) {
        Swal.fire('C', '', 'info')
      }
    })
  }

  


}
