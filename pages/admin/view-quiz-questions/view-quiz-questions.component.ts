import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qid:any;
  quizTitle:any;
  questions:any[] = []; // Change the type to any[] or a suitable type if you have one
  questionsPerPage: number = 3;
  totalPages:any;
  currentPage:any;
  questionsToShow:any[]=[];
  searchQuery: string = '';
  searchResults: any[]=[];
  check:boolean=true;
  

  constructor(private _route: ActivatedRoute, private _questions: QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];        
    this._route.paramMap.subscribe((params) => {
      this.quizTitle = params.get('quizTitle');
    });
    this.currentPage=1;

    this._questions.getQuestionsOfQuiz(this.qid , 0, 10).subscribe({
      next: (data: any) => {
        this.questions = data.content;
        this.totalPages=Math.ceil(this.questions.length/this.questionsPerPage);
        this.calculateQuestionsToShow();
        this.searchResults=[];
        console.log(this.questions);
      },
      error: (err: any) => {
        console.log(err);
        Swal.fire('Error!', 'Error in loading the data', 'error');
      },
    });
  }

  changePage(pageChange: number){
    this.currentPage += pageChange;

    this.calculateQuestionsToShow();
  }

  calculateQuestionsToShow(){
    const startIndex = (this.currentPage-1)*this.questionsPerPage;
    const endIndex = startIndex+this.questionsPerPage;
    this.questionsToShow = this.questions.slice(startIndex,endIndex);
  }

  public deleteQuestions(quesId: any) {
    Swal.fire({
      title: 'Do you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this._questions.deletingQuestions(quesId).subscribe({
          next: (data: any) => {
            this.questions = this.questions.filter((question) => question.quesId != quesId);
            Swal.fire('Deleted!', '', 'success');
          },
        });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  public searchQuestionsByWish(){
    this._questions.searchQuestions(this.qid, this.searchQuery).subscribe({
      next: (data:any)=>{
        console.log("triggered");
        
        this.searchResults=data;
        this.questionsToShow=[];
        console.log("search---->",this.searchResults);

      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('Error!', 'Error in searching questions', 'error');
      }
    
    
    })
  }
}
