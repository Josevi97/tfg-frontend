import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCommunityComponent } from './register-community.component';

describe('RegisterCommunityComponent', () => {
  let component: RegisterCommunityComponent;
  let fixture: ComponentFixture<RegisterCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
