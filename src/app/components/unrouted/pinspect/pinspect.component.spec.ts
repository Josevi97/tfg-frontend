import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinspectComponent } from './pinspect.component';

describe('PinspectComponent', () => {
  let component: PinspectComponent;
  let fixture: ComponentFixture<PinspectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinspectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinspectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
