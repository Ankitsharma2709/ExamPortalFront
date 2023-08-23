import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl1='http://localhost:8082';

  constructor(private http: HttpClient) { }

  public gettingQuz(){
    return this.http.get(`${this.baseUrl1}/quiz/`);
  }

  public addingQuiz(quizData:any){
    return this.http.post(`${this.baseUrl1}/quiz/`,quizData);
  }

  public deletingQuiz(qid:any){
    return this.http.delete(`${this.baseUrl1}/quiz/${qid}`);
  }

  //getting quiz of particular category
  public gettingQuizOfCategory(cid:any){
    return this.http.get(`${this.baseUrl1}/quiz/category/${cid}`);
  }

  public geetingSingleQuiz(qid:any){
    return this.http.get(`${this.baseUrl1}/quiz/${qid}`);
  }

  public updateQuiz(quiz:any){
    return this.http.put(`${this.baseUrl1}/quiz/`,quiz);
  }

  //getting avtive quizzes

  public getActiveQuizzes(){
    return this.http.get(`${this.baseUrl1}/quiz/active`);
  }

  public getActiveQuizzesOfCategory(cid:any){
    return this.http.get(`${this.baseUrl1}/quiz/category/active/${cid}`);
  }
}
