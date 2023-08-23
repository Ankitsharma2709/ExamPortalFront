import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  
  categories=[
    {
      cid:'23',
      title: 'programming',
      
    }
  ];

  quizData={
    
    quizTitle:'',
    quizDescription:'',
    maxMarks:'',
    numberOfQuestions:'',
    active: true,
    category:{
      cid:''
    }
  }
  constructor(private _cat:CategoryService, private quiz:QuizService, private snack: MatSnackBar){}

  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('Error !!!', 'Error in loading data from the server','error');
      }
    });

   
  }
  public quizAdding(){
    console.log("login btn clicked");
    if(this.quizData.quizTitle.trim()==''||this.quizData.quizTitle==null){
      this.snack.open("Title is required !!",'',{
        duration:3000,
      });
      return;
    }
    if(this.quizData.quizDescription.trim()==''||this.quizData.quizDescription==null){
    this.snack.open("Description is required !!",'',{
      duration:3000,
    });
    return;
    }
    if(this.quizData.maxMarks.trim()==''||this.quizData.maxMarks==null){
    this.snack.open("Marks are required !!",'',{
      duration:3000,
    });
    return;
    }
    if(this.quizData.numberOfQuestions.trim()==''||this.quizData.numberOfQuestions==null){
    this.snack.open("Description is required !!",'',{
      duration:3000,
    });
    return;
    }

    this.quiz.addingQuiz(this.quizData).subscribe({
      next: (data:any)=>{
        this.quizData=data;
        console.log("Quiz data is : ",this.quizData);
        
      },
      error: (err:any)=>{
        console.log(err);
      },
      complete: ()=>{
        Swal.fire('Success','Quiz is added successfully','success');

      }
    });

  }


  
  


}


