import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEndComponent } from './list-end.component';

describe('ListEndComponent', () => {
  let component: ListEndComponent;
  let fixture: ComponentFixture<ListEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
