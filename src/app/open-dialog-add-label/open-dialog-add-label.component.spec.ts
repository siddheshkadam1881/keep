import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogAddLabelComponent } from './open-dialog-add-label.component';

describe('OpenDialogAddLabelComponent', () => {
  let component: OpenDialogAddLabelComponent;
  let fixture: ComponentFixture<OpenDialogAddLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogAddLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogAddLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
