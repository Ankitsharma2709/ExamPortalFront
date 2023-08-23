import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartquizComponent } from './startquiz.component';

describe('StartquizComponent', () => {
  let component: StartquizComponent;
  let fixture: ComponentFixture<StartquizComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartquizComponent]
    });
    fixture = TestBed.createComponent(StartquizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
