import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  constructor(private _route:ActivatedRoute, private _quiz: QuizService, private _cat: CategoryService, private router:Router){}
  qid=0;
  quiz: any;
  categores:any;
  ngOnInit(): void {
    //quiz ka data uthaya 
    this.qid = this._route.snapshot.params['qid'];
    this._quiz.geetingSingleQuiz(this.qid).subscribe({
      next: (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);

      },
      error: (err:any)=>{
        console.log(err);
      }
    });
    // categories uthai 
    this._cat.categories().subscribe({
      next: (data:any)=>{
        this.categores=data;
        
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
    
  }
  //thenwhen we submitting then it is updated.

  updateTheQuiz(){
    Swal.fire({
      title: 'Do you want to Update?',
      
      showCancelButton: true,
      confirmButtonText: 'Update',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._quiz.updateQuiz(this.quiz).subscribe({
          next: (data:any)=>{
            
            
            Swal.fire('Updated!', '', 'success')
            



          },
          
        });
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
  


}
