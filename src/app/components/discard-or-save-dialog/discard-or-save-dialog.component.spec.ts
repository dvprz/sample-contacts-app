import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardOrSaveDialog } from './discard-or-save-dialog.component';

describe('DiscardOrSaveDialog', () => {
  let component: DiscardOrSaveDialog;
  let fixture: ComponentFixture<DiscardOrSaveDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscardOrSaveDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscardOrSaveDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
