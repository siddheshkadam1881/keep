import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDialogImageComponent } from './open-dialog-image.component';

describe('OpenDialogImageComponent', () => {
  let component: OpenDialogImageComponent;
  let fixture: ComponentFixture<OpenDialogImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDialogImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDialogImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
