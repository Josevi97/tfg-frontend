import { TestBed } from '@angular/core/testing';

import { InteractivityService } from './interactivity.service';

describe('InteractivityService', () => {
  let service: InteractivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
