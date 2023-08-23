import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstructionsComponent } from './quiz-instructions.component';

describe('QuizInstructionsComponent', () => {
  let component: QuizInstructionsComponent;
  let fixture: ComponentFixture<QuizInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizInstructionsComponent]
    });
    fixture = TestBed.createComponent(QuizInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
