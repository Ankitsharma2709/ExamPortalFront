import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashBoardComponent } from './pages/admin/dash-board/dash-board.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { adminGuard } from './services/admin.guard';
import { normalGuard } from './services/normal.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizInstructionsComponent } from './pages/user/quiz-instructions/quiz-instructions.component';
import { StartquizComponent } from './pages/user/startquiz/startquiz.component';
import { QuizAnalyticsComponent } from './pages/admin/quiz-analytics/quiz-analytics.component';



const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    pathMatch:'full',

  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full',

  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full',
  },
  {
    path:'admin',
    component:DashBoardComponent,
    
    // basically configuring the children module i parent routing
    children:[
      {
        path: '',
        component: WelcomeComponent,
      },
      
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path:'categories',
        component: ViewCategoriesComponent,
      },
      {
        path:'add-categories',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:quizTitle',
        component: ViewQuizQuestionsComponent
      },
      {
        path: 'add-question/:qid',
        component: AddQuestionComponent,
      },
      {
        path: 'update-question/:qid',
        component: UpdateQuestionComponent,
      }, 
      {
        path: 'quiz-attempted/:qid',
        component: QuizAnalyticsComponent,
      }
    ],

    canActivate: [adminGuard]
    

    
  },
  {
    path:'user',
    component:UserDashboardComponent,
    children:[
      {
        path: ':cid',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: QuizInstructionsComponent,
      },
      
    ],
    canActivate: [normalGuard]
    
    
  },
  {
    path: 'start-quiz/:qid',
    component: StartquizComponent,
    canActivate: [normalGuard]
  }
  




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
