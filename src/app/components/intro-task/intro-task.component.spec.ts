import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroTaskComponent } from './intro-task.component';

describe('IntroTaskComponent', () => {
  let component: IntroTaskComponent;
  let fixture: ComponentFixture<IntroTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntroTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
