import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {
  quizzes=[
    {
      qid:23,
      quizTitle: 'Basic Java Quiz',
      quizDescription: 'kfwfjwyfjfiuiuhfkjwbuiwff',
      maxMarks: '50',
      numberOfQuestions: '20',
      active:'',
      category:{
        title:'programming'
      }
    },
    {
      qid:23,
      quizTitle: 'Basic Java Quiz',
      quizDescription: 'kdbfwbkbfuigvkiy iubviuw ud',
      maxMarks: '50',
      numberOfQuestions: '20',
      active:'',
      category:{
        title:'programming'
      }
    },
  ]

  constructor(private _quiz: QuizService){}
  ngOnInit(): void {
    this._quiz.gettingQuz().subscribe({
      next: (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('Error !!', 'Error in loading data','error');
      }

    });
  }

  deletingQuizzes(qid:any){
    Swal.fire({
      title: 'Do you want to delete?',
      
      showCancelButton: true,
      confirmButtonText: 'Delete',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._quiz.deletingQuiz(qid).subscribe({
          next: (data:any)=>{
            this.quizzes=this.quizzes.filter((quiz)=> quiz.qid!=qid);
            Swal.fire('Deleted!', '', 'success')


          },
          
        });
       
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    
  }

  // deletingQuizzes(){
  //   this._quiz.deletingQuiz().subscribe({
  //     next: (quizzes:any)=>{
  //       console.log("Deleing quiz is : ",quizzes);
  //     },
  //     error: (err:any)=>{
  //       console.log(err);
  //     },
  //     complete: ()=>{
  //       Swal.fire('Succes','Quiz is successfully deleted','success');
  //     }
  //   })
  // }

  // this._quiz.deletingQuiz(qid).subscribe({
  //   next: (data:any)=>{
  //     this.quizzes=this.quizzes.filter((quiz)=> quiz.qid!=qid);
  //     Swal.fire({
  //       title: 'Do you want to delete the Particualr quiz?',
  //       showDenyButton: true,
        
  //       confirmButtonText: 'Delete',
  //       denyButtonText: `Abort`,
  //     }).then((result) => {
  //       /* Read more about isConfirmed, isDenied below */
  //       if (result.isConfirmed) {
  //         Swal.fire('Deleted!', '', 'success')
  //       } else if (result.isDenied) {
  //         Swal.fire('The Quiz is not deleted', '', 'info')
  //       }
  //     })
  //   },
  //   error: (err:any)=>{
  //     console.log(err);
  //   }
  // })
  

}
