import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  
 
  qid:any;
  question={
    quiz:{
      qid:'',
    },
    questionContent:'',
    image:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }
  constructor(private _route:ActivatedRoute, private snack:MatSnackBar, private _quest: QuestionService){}
  ngOnInit(): void {
    this.qid=this._route.snapshot.params['qid'];
    //this.qid ye wo hai jo router se li and use question ke qid mein map krdia hamne
    this.question.quiz['qid']=this.qid;
    console.log(this.qid);
  }

  public addingQuestions(){
    console.log("login btn clicked");
    if(this.question.questionContent.trim()==''||this.question.questionContent==null){
        this.snack.open("Question Content is required !!",'',{
          duration:3000,
        });
        return;
    }
    if(this.question.option1.trim()==''||this.question.option1==null){
      this.snack.open("Option 1 is required !!",'',{
        duration:3000,
      });
      return;
   }
    if(this.question.option2.trim()==''||this.question.option2==null){
      this.snack.open("Option 2 is required !!",'',{
        duration:3000,
      });
      return;
   }
    if(this.question.option3.trim()==''||this.question.option3==null){
      this.snack.open("Option3  is required !!",'',{
        duration:3000,
      });
      return;
   }
    if(this.question.option4.trim()==''||this.question.option4==null){
      this.snack.open("Option 4 is required !!",'',{
        duration:3000,
      });
      return;
   }

   this._quest.addingQuestion(this.question).subscribe({
    next: (question:any)=>{
      console.log(this.question);

    },
    error: (err:any)=>{
      console.log(err);
    },
    complete: ()=>{
      Swal.fire('Success !!','The questions is Successfully added','success');
    }
   });

  }


}
