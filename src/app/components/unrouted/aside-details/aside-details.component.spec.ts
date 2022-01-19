import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideDetailsComponent } from './aside-details.component';

describe('AsideDetailsComponent', () => {
  let component: AsideDetailsComponent;
  let fixture: ComponentFixture<AsideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
