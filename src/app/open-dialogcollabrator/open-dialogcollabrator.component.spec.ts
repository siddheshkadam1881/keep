import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogcollabratorComponent } from './open-dialogcollabrator.component';

describe('OpenDialogcollabratorComponent', () => {
  let component: OpenDialogcollabratorComponent;
  let fixture: ComponentFixture<OpenDialogcollabratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogcollabratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogcollabratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
