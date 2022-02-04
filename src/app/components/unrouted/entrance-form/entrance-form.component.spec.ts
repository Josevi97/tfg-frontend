import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceFormComponent } from './entrance-form.component';

describe('EntranceFormComponent', () => {
  let component: EntranceFormComponent;
  let fixture: ComponentFixture<EntranceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntranceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
