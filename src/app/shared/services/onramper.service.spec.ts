import { TestBed } from '@angular/core/testing';

import { OnramperService } from './onramper.service';

describe('OnramperService', () => {
  let service: OnramperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnramperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
