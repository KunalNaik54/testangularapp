import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkComponentNew } from './homework.component';

describe('HomeworkComponentNew', () => {
  let component: HomeworkComponentNew;
  let fixture: ComponentFixture<HomeworkComponentNew>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkComponentNew ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkComponentNew);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
