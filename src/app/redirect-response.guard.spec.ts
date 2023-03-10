import { TestBed } from '@angular/core/testing';

import { RedirectResponseGuard } from './redirect-response.guard';

describe('RedirectResponseGuard', () => {
  let guard: RedirectResponseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectResponseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
