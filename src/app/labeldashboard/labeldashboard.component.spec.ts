import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeldashboardComponent } from './labeldashboard.component';

describe('LabeldashboardComponent', () => {
  let component: LabeldashboardComponent;
  let fixture: ComponentFixture<LabeldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
