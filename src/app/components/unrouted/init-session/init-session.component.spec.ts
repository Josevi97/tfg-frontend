import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitSessionComponent } from './init-session.component';

describe('InitSessionComponent', () => {
  let component: InitSessionComponent;
  let fixture: ComponentFixture<InitSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
