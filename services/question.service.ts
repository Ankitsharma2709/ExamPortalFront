import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl1='http://localhost:8082';

  constructor(private http: HttpClient) { }

  public getQuestionsOfQuiz(qid:any, page?:any, size?:number){
    return this.http.get(`${this.baseUrl1}/question/quiz/${qid}?page=${page}&size=${size}`);
  }
  public getQuestionsOfQuizForExam(qid:any){
    return this.http.get(`${this.baseUrl1}/question/quiz/${qid}`);
  }

  public addingQuestion(question:any){
    return this.http.post(`${this.baseUrl1}/question/`,question);

    
  }
  public deletingQuestions(quesId:any){
    return this.http.delete(`${this.baseUrl1}/question/${quesId}`);
  }

  public updatingQuestion(questions: any) {
    
    return this.http.put(`${this.baseUrl1}/question/`, questions);
  }

  public searchQuestions(qid:any, searchQuery:string ){
    return this.http.get(`${this.baseUrl1}/question/quiz/search/${qid}/?searchTerm=${searchQuery}`);
  }

  public submitQuiz(quizAttempt:any){
    return this.http.post(`${this.baseUrl1}/quiz-attempt/submit`,quizAttempt);
  }

  public getAllQuiz(){
    return this.http.get(`${this.baseUrl1}/quiz-attempt/data`); 
  }

}  
