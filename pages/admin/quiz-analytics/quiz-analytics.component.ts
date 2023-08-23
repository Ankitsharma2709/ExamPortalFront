import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuestionService } from 'src/app/services/question.service';


@Component({
  selector: 'app-quiz-analytics',
  templateUrl: './quiz-analytics.component.html',
  styleUrls: ['./quiz-analytics.component.css']
})
export class QuizAnalyticsComponent implements OnInit{

  dataSource: any;
  chartConfig: any;
  quizAttemt: any={

  };

  constructor(private route:ActivatedRoute, private _ques: QuestionService){}
  ngOnInit(): void {
    this._ques.getAllQuiz().subscribe({
      next: (data:any)=>{
        console.log("triggered");
        this.quizAttemt = data;
        this.calculateAttemptsAndRenderChart();
        console.log(this.quizAttemt);
      }
    });  
    
  }

  calculateAttemptsAndRenderChart(): void{
    const startDate = new Date('2023-08-21 00:00:00.000000');
    const endDate = new Date('2023-08-30 23:59:59.999999');
    

    const  attemptData:any = [];//Array to stre timeStamp and attempts data

    this.quizAttemt.forEach((attempt: any) =>{
      const attemptTimestamp = new Date(attempt.timeStamp);
      console.log(attemptTimestamp);
      
      if(attemptTimestamp >= startDate && attemptTimestamp <= endDate){
        attemptData.push({
          label: attempt.timeStamp, //Use the timeStamp as the label
          value: 1 //Each attempt contrubutor ! to the value
        });
      }

    });


    //Set up the fusionCharts data source

    this.dataSource = {
      chart: {
        caption: 'Quiz Attempts',
        xAxisName: 'Timestamp',
        yAxisName: 'Number of Attempts',
        theme: 'fusion'
      },
      data: attemptData
    };

    //Configure the fusionCharts chart properties 

    this.chartConfig = {
      width: '100%',
      height: '400%',
      type: 'column2d',
      dataFormat: 'json'
    };

  }

}
