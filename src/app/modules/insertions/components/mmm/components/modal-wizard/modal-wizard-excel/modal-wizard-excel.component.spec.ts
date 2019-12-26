import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWizardExcelComponent } from './modal-wizard-excel.component';

describe('ModalWizardExcelComponent', () => {
  let component: ModalWizardExcelComponent;
  let fixture: ComponentFixture<ModalWizardExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWizardExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWizardExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
