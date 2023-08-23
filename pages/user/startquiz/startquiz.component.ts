import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit{
  qid:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  
  questionsPerPage: number = 3;
  totalPages:any;
  currentPage:any;
  questionsToShow: any[]=[];

  
  
  
  
  
  
   
  constructor(private locationSt: LocationStrategy, private _route:ActivatedRoute, private _ques:QuestionService, private snack: MatSnackBar, private userService : UserService){}
  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
    this.currentPage=1;
    
    
    
    
    
      
  }
  //called when buttons are clickd
  changePage(pageChange: number) {
    this.currentPage += pageChange;
    //then this will uodate the number of questions for next page to show
    //like filter the next part of questions array and show the next questions.
    this.calculateQuestionsToShow();
    
  }
  calculateQuestionsToShow() {
    const startIndex = (this.currentPage - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    this.questionsToShow = this.questions.slice(startIndex, endIndex);
  }
  

  
  
 
  
  
  

  
 
  
  loadQuestions() {
    this._ques.getQuestionsOfQuizForExam(this.qid).subscribe({
      next: (data:any)=>{
        this.questions=data.content;
        this.timer=this.questions.length*2*60;
        //calculae the total pages
        this.totalPages=Math.ceil(this.questions.length/this.questionsPerPage);
        //call the function and show the nubmber of questions whihc we want to show just after starting the quiz
        this.calculateQuestionsToShow();
        
        
        console.log("this.questions ---------> ",this.questions);
        console.log("this.totalPages ----->",this.totalPages);
        
        
        
        

        
        
        this.questions.forEach((q:any) => {
          q['givenAnswer']='';
          
        });
        this.startTimer();
      },
      error: (err:any)=>{
        console.log(err);
        Swal.fire('Error!','Error on loading the data','error');
      }
    })
  }
  // In summary, the preventBackButton() function prevents the user from using the browser's
  // back button to navigate away from the current page by immediately re-adding the current 
  //page to the history stack whenever the user attempts to go back. This technique can be used 
  //to create a "one-page" experience where the user can't leave the current page using the back 
  //button but can navigate within the page using other elements or links. However, it's essential 
  //to use this technique judiciously, as it can affect the user experience and navigation flow.
  //in this code, the event handler is a function that is triggered whenever the user navigates away 
  //from the current page. When this event occurs, it immediately pushes a new state onto the history 
  //stack using history.pushState(null, '', location.href).
//Essentially, this code ensures that whenever the user tries to go back in history (using the browser's 
//back button), the current state is immediately re-added to the history stack, preventing the user from
// going back to the previous page.

  preventBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href)
    })
  }

  submitQuiz(){
    this.isSubmit=true;
        this.questions.forEach((q:any)=>{
            if(q.givenAnswer==q.answer){
              this.correctAnswers++;
              let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length;
              this.marksGot+=marksSingle;
              
            }
            //mtln agr null ni hai to mtlb answer attemot kia hai
            //chahe glt ho ya sahi
            if(q.givenAnswer!=''){
              this.attempted++;
            }
            
        });
        this.userService.getUserDetails().subscribe({
          next: (data:any)=>{
            const userId = data.id;
            const quizAttempt = {
              quizId:this.qid,
              userId: userId,
              timestamp: new Date(),
              correctAnswers : this.correctAnswers,
              totalQuestions : this.questions.length,
            };
            this._ques.submitQuiz(quizAttempt).subscribe({
              next: (data:any)=>{
                console.log("Submitted successfully",data);
              },
              error:
              (err:any)=>{
                console.log(err);
              }
            });
          }, 
          error: (err:any)=>{
            console.log(err);
            
          }
        })

        
        
        console.log('Attempted: '+this.attempted);
        console.log('correct answers: '+this.correctAnswers);
        console.log('Marks Got: '+this.marksGot);

  }
  startTimer(){
    let t=window.setInterval(()=>{
      if(this.timer==10){
        this.snack.open("Only 10 seconds remaining",'',{
          duration:2000,
        });
      }
      if(this.timer<=0){
        this.submitQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-mm*60;
    return `${mm} min: ${ss} sec`
  }
  printPage(){
    window.print();
  }
  


}
