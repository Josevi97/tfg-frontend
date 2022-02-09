import { TestBed } from '@angular/core/testing';

import { InfiniteService } from './infinite.service';

describe('InfiniteService', () => {
  let service: InfiniteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfiniteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
