import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{
  qid:any;
  questions:any;
  constructor(private _quest:QuestionService, private _route:ActivatedRoute){}
  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    this._quest.getQuestionsOfQuiz(this.qid).subscribe({
      next: (data:any)=>{
        this.questions=data;
        console.log(this.questions);
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }
  public updateTheQuestions(){
    Swal.fire({
      title: 'Do you want to Update?',
      
      showCancelButton: true,
      confirmButtonText: 'Update',
      
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        this._quest.updatingQuestion(this.questions[0]).subscribe({
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
