import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogLabelComponent } from './open-dialog-label.component';

describe('OpenDialogLabelComponent', () => {
  let component: OpenDialogLabelComponent;
  let fixture: ComponentFixture<OpenDialogLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
