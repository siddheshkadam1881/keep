import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogProfileComponent } from './open-dialog-profile.component';

describe('OpenDialogProfileComponent', () => {
  let component: OpenDialogProfileComponent;
  let fixture: ComponentFixture<OpenDialogProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
